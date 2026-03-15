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

app.get("/api/v1/trades", (req, res) => {
  res.status(200).json({ trades });
});

const port = process.env.PORT || 5100;

app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
