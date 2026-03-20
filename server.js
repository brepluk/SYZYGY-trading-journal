import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();

import morgan from "morgan";
import { prisma } from "./prisma/client.js";
// ROUTERS
import tradeRouter from "./routes/tradeRouter.js";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/v1/trades", tradeRouter);

app.all("/{*splat}", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;

try {
  await prisma.$connect();

  app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
