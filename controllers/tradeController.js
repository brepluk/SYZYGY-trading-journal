import fs from "fs/promises";
import path from "path";
import { prisma } from "../prisma/client.js";
import { StatusCodes } from "http-status-codes";

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

// Get all trades
export const getAllTrades = async (req, res) => {
  const trades = await prisma.trade.findMany({
    where: { userId: req.user.userId },
  });
  res.status(StatusCodes.OK).json({ trades });
};

// Create a new trade
export const createTrade = async (req, res) => {
  const {
    ticker,
    assetType,
    side,
    status,
    entryDate,
    exitDate,
    entryPrice,
    exitPrice,
    contracts,
    quantity,
    strike,
    expiration,
    fees,
    pnl,
    pnlPercent,
    thesis,
    notes,
    setupTag,
  } = req.body;
  const trade = await prisma.trade.create({
    data: {
      user: { connect: { id: req.user.userId } },
      ticker,
      assetType,
      side,
      status,
      entryDate: new Date(entryDate),
      exitDate: exitDate ? new Date(exitDate) : null,
      entryPrice: toFloat(entryPrice),
      exitPrice: toOptionalFloat(exitPrice),
      contracts: toOptionalInt(contracts),
      quantity: toOptionalFloat(quantity),
      strike: toOptionalFloat(strike),
      expiration: expiration ? new Date(expiration) : null,
      fees: fees === undefined || fees === "" ? 0 : toFloat(fees),
      pnl: toOptionalFloat(pnl),
      pnlPercent: toOptionalFloat(pnlPercent),
      thesis,
      notes,
      setupTag,
    },
  });
  res.status(StatusCodes.CREATED).json({ trade });
};
// Get a single trade
export const getSingleTrade = async (req, res) => {
  const trade = await prisma.trade.findUnique({ where: { id: req.params.id } });
  res.status(StatusCodes.OK).json({ trade });
};

// Update a trade
export const updateTrade = async (req, res) => {
  const updatedTrade = await prisma.trade.update({
    where: { id: req.params.id },
    data: req.body,
  });
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
  res
    .status(StatusCodes.OK)
    .json({ message: "Trade deleted successfully", trade: removedTrade });
};
