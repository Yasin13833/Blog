import fs from "fs/promises";
import path from "path";
import { catchAsync, HandleERROR } from "vanta-api";
import { uploadDirectory } from "../../Utils/uploadFile.js";

const normalizeFile = (file) => ({
  filename: file.filename,
  originalName: file.originalname,
  url: `/uploads/${encodeURIComponent(file.filename)}`,
  mimeType: file.mimetype,
  size: file.size,
});

const resolveSafeFilename = (value = "") => {
  let decoded;
  try {
    decoded = decodeURIComponent(String(value).trim());
  } catch {
    throw new HandleERROR("Invalid local upload filename", 400);
  }

  const filename = path.basename(decoded);
  if (!filename || !/^[a-zA-Z0-9._-]+$/.test(filename)) {
    throw new HandleERROR("Invalid local upload filename", 400);
  }

  return filename;
};

export const uploadSingle = catchAsync(async (req, res, next) => {
  if (!req.file) return next(new HandleERROR("No image uploaded", 400));

  return res.status(201).json({
    success: true,
    message: "Image uploaded successfully",
    data: normalizeFile(req.file),
  });
});

export const uploadMultiple = catchAsync(async (req, res, next) => {
  if (!req.files?.length) return next(new HandleERROR("No images uploaded", 400));

  return res.status(201).json({
    success: true,
    message: "Images uploaded successfully",
    data: req.files.map(normalizeFile),
  });
});

export const removeData = catchAsync(async (req, res) => {
  const rawValue = req.body.filename || req.body.url;
  const filename = resolveSafeFilename(rawValue);
  const filePath = path.join(uploadDirectory, filename);

  try {
    await fs.unlink(filePath);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }

  return res.status(200).json({
    success: true,
    message: "Local image removed successfully",
  });
});
