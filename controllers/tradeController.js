import { prisma } from "../prisma/client.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/customErrors.js";
import {
  computeRealizedPnlFromExitLegs,
  resolvedRealizedPnl,
} from "../utils/tradePnl.js";
import { TRADE_SORT_BY, TRADE_STATUS } from "../utils/constants.js";
import {
  normalizeTradeInput,
  parseExitLegsFromBody,
  lastExitDate,
} from "../utils/tradeInput.js";
import {
  unlinkManyIfLocal,
  uploadBufferToCloudinary,
  getCloudinaryPublicIdsFromHtml,
  destroyManyCloudinaryImages,
} from "../utils/cloudinary.js";

const ALL_TRADES_PAGE_SIZE = 10;

// Get all trades (query: search, tradeSide, positionSide, tradeStatus, sort, page)
export const getAllTrades = async (req, res) => {
  const {
    search = "",
    tradeSide = "all",
    positionSide = "all",
    tradeStatus = "all",
    sort = TRADE_SORT_BY.NEWEST_FIRST,
    page: pageRaw = "1",
  } = req.query;

  const page = Math.max(1, Number.parseInt(String(pageRaw), 10) || 1);

  const where = {
    userId: req.user.userId,
  };

  const q = String(search).trim();
  if (q) {
    where.ticker = { contains: q, mode: "insensitive" };
  }
  if (tradeSide && tradeSide !== "all") {
    where.side = tradeSide;
  }
  if (positionSide && positionSide !== "all") {
    where.positionSide = positionSide;
  }
  if (tradeStatus && tradeStatus !== "all") {
    where.status = tradeStatus;
  }

  let trades = await prisma.trade.findMany({
    where,
    include: {
      exitLegs: { orderBy: { exitDate: "asc" } },
    },
  });

  const sortKey = String(sort);
  if (sortKey === TRADE_SORT_BY.OLDEST_FIRST) {
    trades.sort((a, b) => new Date(a.entryDate) - new Date(b.entryDate));
  } else if (sortKey === TRADE_SORT_BY.BEST_PNL) {
    trades.sort((a, b) => resolvedRealizedPnl(b) - resolvedRealizedPnl(a));
  } else if (sortKey === TRADE_SORT_BY.WORST_PNL) {
    trades.sort((a, b) => resolvedRealizedPnl(a) - resolvedRealizedPnl(b));
  } else if (sortKey === TRADE_SORT_BY.TICKER_AZ) {
    trades.sort((a, b) => a.ticker.localeCompare(b.ticker));
  } else if (sortKey === TRADE_SORT_BY.TICKER_ZA) {
    trades.sort((a, b) => b.ticker.localeCompare(a.ticker));
  } else {
    trades.sort((a, b) => new Date(b.entryDate) - new Date(a.entryDate));
  }

  const totalTrades = trades.length;
  const limit = ALL_TRADES_PAGE_SIZE;
  const numPages = totalTrades === 0 ? 0 : Math.ceil(totalTrades / limit);
  const safePage = numPages === 0 ? 1 : Math.min(page, numPages);
  const skip = (safePage - 1) * limit;
  const pageTrades = trades.slice(skip, skip + limit);

  res.status(StatusCodes.OK).json({
    trades: pageTrades,
    totalTrades,
    numPages,
    currentPage: safePage,
  });
};

// Create a new trade
export const createTrade = async (req, res) => {
  const exitLegs = parseExitLegsFromBody(req.body) ?? [];
  const data = normalizeTradeInput(req.body);

  const shouldAttachExitLegs =
    String(data.status ?? "").toUpperCase() === TRADE_STATUS.CLOSED &&
    Array.isArray(exitLegs) &&
    exitLegs.length > 0;

  let pnl = null;
  let pnlPercent = null;
  let exitDate = data.exitDate ?? null;
  if (shouldAttachExitLegs) {
    const computed = computeRealizedPnlFromExitLegs({
      side: data.side,
      entryPrice: data.entryPrice,
      fees: data.fees ?? 0,
      assetType: data.assetType,
      exitLegs,
    });
    pnl = computed.pnl;
    pnlPercent = computed.pnlPercent;
    exitDate = lastExitDate(exitLegs);
  }

  const trade = await prisma.trade.create({
    data: {
      user: { connect: { id: req.user.userId } },
      ...data,
      ...(pnl != null ? { pnl } : {}),
      ...(pnlPercent != null ? { pnlPercent } : {}),
      ...(exitDate ? { exitDate } : {}),
      ...(shouldAttachExitLegs ? { exitLegs: { create: exitLegs } } : {}),
    },
    include: { exitLegs: { orderBy: { exitDate: "asc" } } },
  });
  res.status(StatusCodes.CREATED).json({ trade });
};

// Get a single trade
export const getSingleTrade = async (req, res) => {
  const trade = await prisma.trade.findUnique({
    where: { id: req.params.id },
    include: { exitLegs: { orderBy: { exitDate: "asc" } } },
  });
  res.status(StatusCodes.OK).json({ trade });
};

// Update a trade
export const updateTrade = async (req, res) => {
  // PATCH requests can send a subset of fields; normalize only what's present.
  const existingTrade = await prisma.trade.findUnique({
    where: { id: req.params.id },
    select: { notes: true, userId: true },
  });
  const data = normalizeTradeInput(req.body);
  const exitLegs = parseExitLegsFromBody(req.body); // undefined if not provided

  const updatedTrade = await prisma.$transaction(async (tx) => {
    if (Array.isArray(exitLegs)) {
      await tx.exitLeg.deleteMany({ where: { tradeId: req.params.id } });
    }

    // Get the effective trade values we need to compute P&L.
    const effective = await tx.trade.findUnique({
      where: { id: req.params.id },
      include: { exitLegs: { orderBy: { exitDate: "asc" } } },
    });

    const next = { ...effective, ...data };
    const nextExitLegs = Array.isArray(exitLegs)
      ? exitLegs
      : effective.exitLegs;

    const isClosed =
      String(next.status ?? "").toUpperCase() === TRADE_STATUS.CLOSED;
    const hasExitLegs = Array.isArray(nextExitLegs) && nextExitLegs.length > 0;

    let computed = { pnl: null, pnlPercent: null };
    let inferredExitDate = next.exitDate ?? null;
    if (isClosed && hasExitLegs) {
      computed = computeRealizedPnlFromExitLegs({
        side: next.side,
        entryPrice: next.entryPrice,
        fees: next.fees ?? 0,
        assetType: next.assetType,
        exitLegs: nextExitLegs,
      });
      inferredExitDate = lastExitDate(nextExitLegs);
    }

    return tx.trade.update({
      where: { id: req.params.id },
      data: {
        ...data,
        ...(Array.isArray(exitLegs) ? { exitLegs: { create: exitLegs } } : {}),
        ...(computed.pnl != null ? { pnl: computed.pnl } : { pnl: null }),
        ...(computed.pnlPercent != null
          ? { pnlPercent: computed.pnlPercent }
          : { pnlPercent: null }),
        ...(isClosed && inferredExitDate ? { exitDate: inferredExitDate } : {}),
      },
      include: { exitLegs: { orderBy: { exitDate: "asc" } } },
    });
  });

  if (Object.prototype.hasOwnProperty.call(data, "notes")) {
    const oldIds = getCloudinaryPublicIdsFromHtml(existingTrade?.notes ?? "");
    const newIds = getCloudinaryPublicIdsFromHtml(updatedTrade?.notes ?? "");
    const removedIds = new Set([...oldIds].filter((id) => !newIds.has(id)));
    await destroyManyCloudinaryImages(removedIds);
  }

  res
    .status(StatusCodes.OK)
    .json({ message: "Trade updated successfully", trade: updatedTrade });
};

// Delete a trade
export const deleteTrade = async (req, res) => {
  const removedTrade = await prisma.trade.delete({
    where: { id: req.params.id },
  });
  await unlinkManyIfLocal(removedTrade?.screenshots ?? []);
  const noteImageIds = getCloudinaryPublicIdsFromHtml(
    removedTrade?.notes ?? "",
  );
  await destroyManyCloudinaryImages(noteImageIds);
  res
    .status(StatusCodes.OK)
    .json({ message: "Trade deleted successfully", trade: removedTrade });
};

export const uploadTradeImage = async (req, res) => {
  if (!req.file) {
    throw new BadRequestError("No image uploaded");
  }
  if (!req.file.mimetype?.startsWith("image/")) {
    throw new BadRequestError("Only image files are allowed");
  }

  const result = await uploadBufferToCloudinary(req.file.buffer);
  res.status(StatusCodes.CREATED).json({
    url: result.secure_url,
    publicId: result.public_id,
  });
};
