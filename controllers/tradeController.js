import fs from "fs/promises";
import path from "path";
import cloudinary from "cloudinary";
import { prisma } from "../prisma/client.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/customErrors.js";
import dayjs from "dayjs";
import {
  resolveDashboardRange,
  resolveCalendarMonth,
} from "../utils/dashboardDateRange.js";
import {
  computeRealizedPnlFromExitLegs,
  resolvedRealizedPnl,
} from "../utils/tradePnl.js";
import { TRADE_SORT_BY, TRADE_STATUS } from "../utils/constants.js";

/** Form bodies send strings; Prisma expects numbers. Empty optional fields → null. */
const toFloat = (value) => Number.parseFloat(String(value));

const toOptionalFloat = (value) => {
  if (value === undefined || value === null || value === "") return null;
  const n = Number.parseFloat(String(value));
  return Number.isNaN(n) ? null : n;
};

const toOptionalInt = (value) => {
  if (value === undefined || value === null || value === "") return null;
  const n = Number.parseInt(String(value), 10);
  return Number.isNaN(n) ? null : n;
};

const isValidDate = (d) => d instanceof Date && !Number.isNaN(d.valueOf());

const parseExitLegsFromBody = (body) => {
  if (!Object.prototype.hasOwnProperty.call(body, "exitLegs")) return undefined;
  const raw = body.exitLegs;
  if (raw === undefined || raw === null || raw === "") return [];

  let parsed;
  try {
    parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
  } catch {
    return [];
  }

  if (!Array.isArray(parsed)) return [];

  const legs = [];
  for (const leg of parsed) {
    const q = Number(leg?.quantity);
    const px = Number(leg?.price);
    const note = typeof leg?.note === "string" ? leg.note : undefined;

    if (!Number.isFinite(q) || q <= 0) continue;
    if (!Number.isFinite(px)) continue;

    let exitDate = leg?.exitDate ? new Date(leg.exitDate) : null;
    if (!isValidDate(exitDate)) {
      // If user entered qty/price but forgot date, still persist with "now"
      exitDate = new Date();
    }

    legs.push({
      quantity: q,
      price: px,
      exitDate,
      ...(note && note.trim() ? { note: note.trim() } : {}),
    });
  }

  legs.sort((a, b) => a.exitDate - b.exitDate);
  return legs;
};

const lastExitDate = (legs) => {
  if (!Array.isArray(legs) || legs.length === 0) return null;
  return legs[legs.length - 1].exitDate ?? null;
};

const normalizeTradeInput = (body) => {
  // Express form submissions come in as strings.
  // Only coerce fields that are known to exist in the Trade schema.
  const out = {};

  // String/enum fields
  const stringFields = [
    "ticker",
    "assetType",
    "side",
    "positionSide",
    "status",
    "thesis",
    "notes",
    "setupTag",
  ];
  for (const key of stringFields) {
    if (Object.prototype.hasOwnProperty.call(body, key)) out[key] = body[key];
  }

  // DateTimes coming from <input type="datetime-local" /> and <input type="date" />
  // Prisma's `entryDate` is required in the schema, so on update:
  // - if the user sends an empty string, we omit the field so Prisma keeps the old value.
  if (Object.prototype.hasOwnProperty.call(body, "entryDate")) {
    const v = body.entryDate;
    if (v !== "" && v != null) out.entryDate = new Date(v);
  }
  if (Object.prototype.hasOwnProperty.call(body, "exitDate")) {
    const v = body.exitDate;
    out.exitDate = v === "" || v == null ? null : new Date(v);
  }
  if (Object.prototype.hasOwnProperty.call(body, "expiration")) {
    const v = body.expiration;
    out.expiration = v === "" || v == null ? null : new Date(v);
  }

  // Numbers coming from <input type="number" />
  if (Object.prototype.hasOwnProperty.call(body, "entryPrice")) {
    const v = body.entryPrice;
    if (v !== "" && v != null) out.entryPrice = toFloat(v);
  }
  if (Object.prototype.hasOwnProperty.call(body, "exitPrice")) {
    out.exitPrice = toOptionalFloat(body.exitPrice);
  }
  if (Object.prototype.hasOwnProperty.call(body, "contracts")) {
    out.contracts = toOptionalInt(body.contracts);
  }
  if (Object.prototype.hasOwnProperty.call(body, "quantity")) {
    out.quantity = toOptionalFloat(body.quantity);
  }
  if (Object.prototype.hasOwnProperty.call(body, "strike")) {
    out.strike = toOptionalFloat(body.strike);
  }
  if (Object.prototype.hasOwnProperty.call(body, "fees")) {
    const v = body.fees;
    out.fees = v === undefined || v === "" || v == null ? 0 : toFloat(v);
  }
  if (Object.prototype.hasOwnProperty.call(body, "pnl")) {
    out.pnl = toOptionalFloat(body.pnl);
  }
  if (Object.prototype.hasOwnProperty.call(body, "pnlPercent")) {
    out.pnlPercent = toOptionalFloat(body.pnlPercent);
  }

  return out;
};

const unlinkUploadIfLocal = async (url) => {
  if (!url || typeof url !== "string" || !url.startsWith("/uploads/")) return;
  const diskPath = path.join(process.cwd(), url.replace(/^\//, ""));
  try {
    await fs.unlink(diskPath);
  } catch {
    /* ignore missing file */
  }
};

const unlinkManyIfLocal = async (urls) => {
  if (!Array.isArray(urls)) return;
  for (const url of urls) {
    await unlinkUploadIfLocal(url);
  }
};

const uploadBufferToCloudinary = (buffer, folder = "trade-notes") =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.v2.uploader.upload_stream(
      { folder, resource_type: "image" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      },
    );
    stream.end(buffer);
  });

const cloudName = process.env.CLOUD_NAME;

const getCloudinaryPublicIdsFromHtml = (html) => {
  if (!cloudName || !html || typeof html !== "string") return new Set();
  const ids = new Set();
  const cloudBase = `https://res.cloudinary.com/${cloudName}/image/upload/`;
  const srcRegex = /<img[^>]+src=["']([^"']+)["']/gi;

  let match;
  while ((match = srcRegex.exec(html)) !== null) {
    const src = match[1];
    if (!src.startsWith(cloudBase)) continue;

    // Example:
    // https://res.cloudinary.com/<cloud>/image/upload/v123/trade-notes/abcxyz.png
    const afterUpload = src.slice(cloudBase.length).split("?")[0];
    const withoutVersion = afterUpload.replace(/^v\d+\//, "");
    const withoutExtension = withoutVersion.replace(/\.[^/.]+$/, "");
    if (withoutExtension) ids.add(withoutExtension);
  }

  return ids;
};

const destroyManyCloudinaryImages = async (publicIds) => {
  if (!publicIds || publicIds.size === 0) return;
  for (const publicId of publicIds) {
    try {
      await cloudinary.v2.uploader.destroy(publicId, {
        resource_type: "image",
      });
    } catch {
      // Ignore delete errors so note/trade operations can still complete.
    }
  }
};

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

const dayKeyFromDate = (d) => dayjs(d).format("YYYY-MM-DD");

const buildDailySeries = (startDate, endDate, trades) => {
  const dailyNet = new Map();
  const dailyCount = new Map();
  for (const t of trades) {
    if (!t.exitDate) continue;
    const k = dayKeyFromDate(t.exitDate);
    const p = resolvedRealizedPnl(t);
    dailyNet.set(k, (dailyNet.get(k) ?? 0) + p);
    dailyCount.set(k, (dailyCount.get(k) ?? 0) + 1);
  }
  const days = [];
  let cur = dayjs(startDate).startOf("day");
  let last = dayjs(endDate).startOf("day");
  if (cur.isAfter(last)) {
    cur = last;
  }
  let cumulative = 0;
  while (cur.isBefore(last) || cur.isSame(last, "day")) {
    const key = cur.format("YYYY-MM-DD");
    const dailyNetPnl = dailyNet.get(key) ?? 0;
    const tradeCount = dailyCount.get(key) ?? 0;
    cumulative += dailyNetPnl;
    days.push({
      date: key,
      dailyNetPnl,
      cumulativeNetPnl: cumulative,
      trades: tradeCount,
    });
    cur = cur.add(1, "day");
  }
  return days;
};

export const getDashboardStats = async (req, res) => {
  const { key, startDate, endDate } = resolveDashboardRange(req.query.range);

  const trades = await prisma.trade.findMany({
    where: {
      userId: req.user.userId,
      status: TRADE_STATUS.CLOSED,
      exitDate: {
        not: null,
        ...(endDate ? { lte: endDate } : {}),
        ...(startDate ? { gte: startDate } : {}),
      },
    },
    include: {
      exitLegs: { orderBy: { exitDate: "asc" } },
    },
  });

  let netPnl = 0;
  for (const t of trades) {
    netPnl += resolvedRealizedPnl(t);
  }

  const totalClosedTrades = trades.length;
  let winningTrades = 0;
  for (const t of trades) {
    if (resolvedRealizedPnl(t) > 0) winningTrades += 1;
  }
  const tradeWinRate =
    totalClosedTrades > 0 ? (winningTrades / totalClosedTrades) * 100 : 0;

  const winPnls = trades
    .map((t) => resolvedRealizedPnl(t))
    .filter((p) => p > 0);
  const lossPnls = trades
    .map((t) => resolvedRealizedPnl(t))
    .filter((p) => p < 0);

  const avgWin =
    winPnls.length > 0
      ? winPnls.reduce((s, p) => s + p, 0) / winPnls.length
      : null;
  const avgLoss =
    lossPnls.length > 0
      ? lossPnls.reduce((s, p) => s + p, 0) / lossPnls.length
      : null;

  let seriesStart = startDate;
  if (!seriesStart) {
    if (trades.length > 0) {
      const earliest = trades.reduce(
        (min, t) => (t.exitDate < min ? t.exitDate : min),
        trades[0].exitDate,
      );
      seriesStart = dayjs(earliest).startOf("day").toDate();
    } else {
      seriesStart = dayjs().startOf("day").toDate();
    }
  }

  let seriesEnd = endDate;
  if (!seriesEnd) {
    if (trades.length > 0) {
      const latest = trades.reduce(
        (max, t) => (t.exitDate > max ? t.exitDate : max),
        trades[0].exitDate,
      );
      seriesEnd = dayjs(latest).endOf("day").toDate();
    } else {
      seriesEnd = dayjs().endOf("day").toDate();
    }
  }

  const dailySeries = buildDailySeries(seriesStart, seriesEnd, trades);

  res.status(StatusCodes.OK).json({
    summary: {
      netPnl,
      tradeWinRate,
      avgWin,
      avgLoss,
      winningTrades,
      losingTrades: lossPnls.length,
      totalClosedTrades,
    },
    dailySeries,
    range: {
      key,
      startDate: startDate ? startDate.toISOString() : null,
      endDate: endDate ? endDate.toISOString() : null,
    },
  });
};

export const getDashboardCalendar = async (req, res) => {
  const year = Number.parseInt(String(req.query.year ?? ""), 10);
  const month = Number.parseInt(String(req.query.month ?? ""), 10);
  if (Number.isNaN(year) || year < 1970 || year > 2100) {
    throw new BadRequestError("Invalid year");
  }
  if (Number.isNaN(month) || month < 1 || month > 12) {
    throw new BadRequestError("Invalid month");
  }

  const {
    startDate,
    endDate,
    year: y,
    month: m,
  } = resolveCalendarMonth(year, month);

  const trades = await prisma.trade.findMany({
    where: {
      userId: req.user.userId,
      entryDate: {
        gte: startDate,
        lte: endDate,
      },
    },
    include: {
      exitLegs: { orderBy: { exitDate: "asc" } },
    },
  });

  const dailyNet = new Map();
  const dailyCount = new Map();
  for (const t of trades) {
    const k = dayKeyFromDate(t.entryDate);
    const isClosed =
      String(t.status ?? "").toUpperCase() === TRADE_STATUS.CLOSED;
    const p = isClosed ? resolvedRealizedPnl(t) : 0;
    dailyNet.set(k, (dailyNet.get(k) ?? 0) + p);
    dailyCount.set(k, (dailyCount.get(k) ?? 0) + 1);
  }

  const days = [];
  let cur = dayjs(startDate).startOf("day");
  const last = dayjs(endDate).startOf("day");
  while (cur.isBefore(last) || cur.isSame(last, "day")) {
    const key = cur.format("YYYY-MM-DD");
    days.push({
      date: key,
      netPnl: dailyNet.get(key) ?? 0,
      trades: dailyCount.get(key) ?? 0,
    });
    cur = cur.add(1, "day");
  }

  res.status(StatusCodes.OK).json({
    month: {
      year: y,
      month: m,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    },
    days,
  });
};
