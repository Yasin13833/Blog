import fs from "fs";
import path from "path";
import Brand from "../Models/BrandMd.js";
import Product from "../Models/ProductMd.js";
import ProductCategory from "../Models/ProductCategoryMd.js";
import { catchAsync } from "vanta-api";
import { ApiError, sendSuccess } from "../Utils/Api.js";
import { PUBLIC_DIR } from "../Utils/Paths.js";

const filePayload = (file) => ({
  filename: file.filename,
  url: `/upload/${file.filename}`,
  mimeType: file.mimetype,
  size: file.size,
});

export const uploadImage = catchAsync(async (req, res) => {
  if (!req.file) throw new ApiError("No image uploaded", 400, "FILE_REQUIRED");
  return sendSuccess(res, {
    statusCode: 201,
    message: "Image uploaded successfully",
    data: filePayload(req.file),
  });
});

export const uploadImages = catchAsync(async (req, res) => {
  if (!req.files?.length) throw new ApiError("No images uploaded", 400, "FILE_REQUIRED");
  return sendSuccess(res, {
    statusCode: 201,
    message: "Images uploaded successfully",
    data: req.files.map(filePayload),
  });
});

export const uploadDocument = catchAsync(async (req, res) => {
  if (!req.file) throw new ApiError("No document uploaded", 400, "FILE_REQUIRED");
  return sendSuccess(res, {
    statusCode: 201,
    message: "Document uploaded successfully",
    data: filePayload(req.file),
  });
});

const findMediaReferences = async (url) => {
  const [brands, categories, products] = await Promise.all([
    Brand.countDocuments({ $or: [{ logo: url }, { coverImage: url }] }),
    ProductCategory.countDocuments({ $or: [{ image: url }, { icon: url }] }),
    Product.countDocuments({
      $or: [
        { thumbnail: url },
        { images: url },
        { "features.icon": url },
        { "documents.url": url },
      ],
    }),
  ]);
  return { brands, categories, products, total: brands + categories + products };
};

export const removeMedia = catchAsync(async (req, res) => {
  const raw = String(req.params.filename || "");
  const filename = path.basename(raw);
  if (!filename || filename !== raw) {
    throw new ApiError("Invalid filename", 400, "INVALID_FILENAME");
  }

  const target = path.join(PUBLIC_DIR, filename);
  if (!fs.existsSync(target)) throw new ApiError("File not found", 404, "FILE_NOT_FOUND");

  const references = await findMediaReferences(`/upload/${filename}`);
  if (references.total > 0) {
    throw new ApiError(
      "File is still referenced by catalog content",
      409,
      "MEDIA_IN_USE",
      null,
      references
    );
  }

  await fs.promises.unlink(target);
  return sendSuccess(res, {
    message: "Media removed successfully",
    data: { filename },
  });
});
