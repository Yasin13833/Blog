import fs from "fs";
import multer from "multer";
import crypto from "crypto";
import { PUBLIC_DIR } from "./Paths.js";

fs.mkdirSync(PUBLIC_DIR, { recursive: true });

const extensionByMime = new Map([
  ["image/jpeg", ".jpg"],
  ["image/png", ".png"],
  ["image/webp", ".webp"],
  ["image/avif", ".avif"],
  ["application/pdf", ".pdf"],
]);

const imageMimeTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);
const documentMimeTypes = new Set(["application/pdf"]);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, PUBLIC_DIR),
  filename: (req, file, cb) => {
    const ext = extensionByMime.get(file.mimetype) || "";
    cb(null, `${Date.now()}-${crypto.randomUUID()}${ext}`);
  },
});

const createUpload = ({ allowedMimeTypes, fileSize, files = 1, label }) =>
  multer({
    storage,
    limits: { fileSize, files },
    fileFilter: (req, file, cb) => {
      if (!allowedMimeTypes.has(file.mimetype)) {
        return cb(new Error(`Only ${label} files are allowed`));
      }
      cb(null, true);
    },
  });

export const imageUpload = createUpload({
  allowedMimeTypes: imageMimeTypes,
  fileSize: 10 * 1024 * 1024,
  files: 10,
  label: "JPG, PNG, WEBP and AVIF image",
});

export const documentUpload = createUpload({
  allowedMimeTypes: documentMimeTypes,
  fileSize: 20 * 1024 * 1024,
  files: 1,
  label: "PDF document",
});

export const anyMediaUpload = createUpload({
  allowedMimeTypes: new Set([...imageMimeTypes, ...documentMimeTypes]),
  fileSize: 20 * 1024 * 1024,
  files: 10,
  label: "JPG, PNG, WEBP, AVIF and PDF",
});
