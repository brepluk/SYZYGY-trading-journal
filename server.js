import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();

import morgan from "morgan";
import { nanoid } from "nanoid";

let trades = [
  { id: nanoid(), ticker: "TSLA", side: "CALL" },
  { id: nanoid(), ticker: "GOOGL", side: "PUT" },
];

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/", (req, res) => {
  console.log(req);
  res.json({ message: "Data received", data: req.body });
});

// GET ALL TRADES
app.get("/api/v1/trades", (req, res) => {
  res.status(200).json({ trades });
});

// CREATE TRADE
app.post("/api/v1/trades", (req, res) => {
  const { ticker, side } = req.body;
  if (!ticker || !side) {
    return res.status(400).json({ message: "Ticker and side are required" });
  }
  const id = nanoid(10);
  const trade = { id, ticker, side };
  trades.push(trade);
  res.status(200).json({ trade });
});

// GET SINGLE TRADE
app.get("/api/v1/trades/:id", (req, res) => {
  const { id } = req.params;
  const trade = trades.find((trade) => trade.id === id);
  if (!trade) {
    return res.status(404).json({ message: `no trade found with id ${id}` });
  }
  res.status(200).json({ trade });
});

// EDIT TRADE
app.patch("/api/v1/trades/:id", (req, res) => {
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
});

// DELETE TRADE
app.delete("/api/v1/trades/:id", (req, res) => {
  const { id } = req.params;
  const trade = trades.find((trade) => trade.id === id);
  if (!trade) {
    return res.status(404).json({ message: `no trade found with id ${id}` });
  }
  const newTrades = trades.filter((trade) => trade.id !== id);
  trades = newTrades;
  res.status(200).json({ message: "Trade deleted successfully" });
});

const port = process.env.PORT || 5100;

app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
