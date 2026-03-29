import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import helmet from "helmet";
import hpp from "hpp";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import morgan from "morgan";
import { prisma } from "./prisma/client.js";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";

// ROUTERS
import tradeRouter from "./routes/tradeRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import newsRouter from "./routes/newsRouter.js";

// MIDDLEWARE
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY || process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET || process.env.CLOUDINARY_API_SECRET,
});

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cookieParser());
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "script-src": [
          "'self'",
          "https://s3.tradingview.com",
          "https://www.tradingview.com",
          "https://www.tradingview-widget.com",
        ],
        "frame-src": [
          "'self'",
          "https://s3.tradingview.com",
          "https://www.tradingview.com",
          "https://*.tradingview.com",
          "https://www.tradingview-widget.com",
          "https://*.tradingview-widget.com",
        ],
        "img-src": ["'self'", "data:", "https:", "blob:"],
        "connect-src": [
          "'self'",
          "https://www.tradingview.com",
          "https://*.tradingview.com",
          "wss://*.tradingview.com",
          "https://www.tradingview-widget.com",
          "https://*.tradingview-widget.com",
          "wss://*.tradingview-widget.com",
        ],
      },
    },
  }),
);
app.use(hpp());
app.use(express.json());

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use(express.static(path.resolve(__dirname, "./client/dist")));

app.use("/api/v1/trades", authenticateUser, tradeRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
app.use("/api/v1/news", authenticateUser, newsRouter);

app.all("/api/{*splat}", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

app.get("/{*splat}", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist/index.html"));
});

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;

try {
  await prisma.$connect();

  app.listen(port, () => {
    console.info(`Server is running on port ${port}...`);
  });
} catch (error) {
  console.error(error);
  process.exit(1);
}
