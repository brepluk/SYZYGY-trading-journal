import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();

import morgan from "morgan";
import prismaClientPkg from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const { PrismaClient } = prismaClientPkg;

// Prisma 7 requires an explicit driver adapter/connection.
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("Missing DATABASE_URL in environment (.env)");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });
// ROUTERS
import tradeRouter from "./routes/tradeRouter.js";

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

app.use("/api/v1/trades", tradeRouter);

app.all("/{*splat}", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: "something went wrong" });
  next();
});

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
