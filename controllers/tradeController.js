import { nanoid } from "nanoid";

let trades = [
  { id: nanoid(), ticker: "TSLA", side: "CALL" },
  { id: nanoid(), ticker: "GOOGL", side: "PUT" },
];

export const getAllTrades = async (req, res) => {
  res.status(200).json({ trades });
};

export const createTrade = async (req, res) => {
  const { ticker, side } = req.body;
  if (!ticker || !side) {
    return res.status(400).json({ message: "Ticker and side are required" });
  }
  const id = nanoid(10);
  const trade = { id, ticker, side };
  trades.push(trade);
  res.status(201).json({ trade });
};

export const getSingleTrade = async (req, res) => {
  const { id } = req.params;
  const trade = trades.find((trade) => trade.id === id);
  if (!trade) {
    return res.status(404).json({ message: `no trade found with id ${id}` });
  }
  res.status(200).json({ trade });
};

export const updateTrade = async (req, res) => {
  const { ticker, side } = req.body;
  if (!ticker || !side) {
    return res.status(400).json({ message: "Ticker and side are required" });
  }
  const { id } = req.params;
  const trade = trades.find((trade) => trade.id === id);
  if (!trade) {
    return res.status(404).json({ message: `no trade found with id ${id}` });
  }
  trade.ticker = ticker;
  trade.side = side;
  res.status(200).json({ message: "Trade updated successfully", trade });
};

export const deleteTrade = async (req, res) => {
  const { id } = req.params;
  const trade = trades.find((trade) => trade.id === id);
  if (!trade) {
    return res.status(404).json({ message: `no trade found with id ${id}` });
  }
  const newTrades = trades.filter((trade) => trade.id !== id);
  trades = newTrades;
  res.status(200).json({ message: "Trade deleted successfully" });
};
