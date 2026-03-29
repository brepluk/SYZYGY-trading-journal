import fs from "fs/promises";
import path from "path";
import cloudinary from "cloudinary";

export const unlinkUploadIfLocal = async (url) => {
  if (!url || typeof url !== "string" || !url.startsWith("/uploads/")) return;
  const diskPath = path.join(process.cwd(), url.replace(/^\//, ""));
  try {
    await fs.unlink(diskPath);
  } catch {
    /* ignore missing file */
  }
};

export const unlinkManyIfLocal = async (urls) => {
  if (!Array.isArray(urls)) return;
  for (const url of urls) {
    await unlinkUploadIfLocal(url);
  }
};

export const uploadBufferToCloudinary = (buffer, folder = "trade-notes") =>
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

export const getCloudinaryPublicIdsFromHtml = (html) => {
  if (!cloudName || !html || typeof html !== "string") return new Set();
  const ids = new Set();
  const cloudBase = `https://res.cloudinary.com/${cloudName}/image/upload/`;
  const srcRegex = /<img[^>]+src=["']([^"']+)["']/gi;

  let match;
  while ((match = srcRegex.exec(html)) !== null) {
    const src = match[1];
    if (!src.startsWith(cloudBase)) continue;

    const afterUpload = src.slice(cloudBase.length).split("?")[0];
    const withoutVersion = afterUpload.replace(/^v\d+\//, "");
    const withoutExtension = withoutVersion.replace(/\.[^/.]+$/, "");
    if (withoutExtension) ids.add(withoutExtension);
  }

  return ids;
};

export const destroyManyCloudinaryImages = async (publicIds) => {
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
