import fs from "fs/promises";
import path from "path";
import cloudinary from "cloudinary";
import { prisma } from "../prisma/client.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/customErrors.js";

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

const normalizeTradeInput = (body) => {
  // Express form submissions come in as strings.
  // Only coerce fields that are known to exist in the Trade schema.
  const out = {};

  // String/enum fields
  const stringFields = [
    "ticker",
    "assetType",
    "side",
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
      await cloudinary.v2.uploader.destroy(publicId, { resource_type: "image" });
    } catch {
      // Ignore delete errors so note/trade operations can still complete.
    }
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
  const data = normalizeTradeInput(req.body);
  const trade = await prisma.trade.create({
    data: {
      user: { connect: { id: req.user.userId } },
      ...data,
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
  // PATCH requests can send a subset of fields; normalize only what's present.
  const existingTrade = await prisma.trade.findUnique({
    where: { id: req.params.id },
    select: { notes: true },
  });
  const data = normalizeTradeInput(req.body);
  const updatedTrade = await prisma.trade.update({
    where: { id: req.params.id },
    data,
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
  const noteImageIds = getCloudinaryPublicIdsFromHtml(removedTrade?.notes ?? "");
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
