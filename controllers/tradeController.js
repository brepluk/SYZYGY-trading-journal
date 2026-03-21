import { prisma } from "../prisma/client.js";
import { StatusCodes } from "http-status-codes";

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
    screenshotUrl,
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
      entryPrice,
      exitPrice,
      contracts,
      quantity,
      strike,
      expiration: expiration ? new Date(expiration) : null,
      fees,
      pnl,
      pnlPercent,
      thesis,
      notes,
      setupTag,
      screenshotUrl,
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
  res
    .status(StatusCodes.OK)
    .json({ message: "Trade deleted successfully", trade: removedTrade });
};
