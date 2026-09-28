import fs from "fs";
import path from "path";
import crypto from "crypto";
import multer from "multer";
import slugify from "slugify";
import { HandleERROR } from "vanta-api";
import { rootDir } from "./Env.js";

export const uploadDirectory = path.join(rootDir, "Public", "uploads");
fs.mkdirSync(uploadDirectory, { recursive: true });

const mimeExtensions = new Map([
  ["image/jpeg", ".jpg"],
  ["image/png", ".png"],
  ["image/webp", ".webp"],
  ["image/gif", ".gif"],
  ["image/avif", ".avif"],
]);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDirectory),
  filename: (req, file, cb) => {
    const originalBase = path.parse(file.originalname || "image").name;
    const safeBase =
      slugify(originalBase, { lower: true, strict: true, trim: true }) || "image";
    const extension = mimeExtensions.get(file.mimetype) || ".img";
    const unique = crypto.randomUUID();
    cb(null, `${safeBase}-${Date.now()}-${unique}${extension}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: Number(process.env.UPLOAD_MAX_FILE_SIZE_MB || 10) * 1024 * 1024,
    files: Number(process.env.UPLOAD_MAX_FILES || 10),
  },
  fileFilter: (req, file, cb) => {
    if (!mimeExtensions.has(file.mimetype)) {
      return cb(new HandleERROR("Only JPEG, PNG, WebP, GIF and AVIF images are allowed", 415));
    }
    return cb(null, true);
  },
});

export default upload;
