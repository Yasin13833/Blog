import mongoose from "mongoose";
import { escapeRegExp, toBoolean } from "./PublicQuery.js";

export const productCardFields =
  "name slug shortDescription model sku thumbnail isFeatured sortOrder brandId categoryId createdAt updatedAt";

export const identifierFilter = (identifier) => {
  if (mongoose.isValidObjectId(identifier)) return { _id: identifier };
  return {
    $or: [
      { "slug.fa": identifier },
      { "slug.en": identifier },
      { "slug.ar": identifier },
    ],
  };
};

export const buildLocalizedSearchFilter = (
  query,
  fields = ["name", "description"],
  plainFields = []
) => {
  if (!query?.trim()) return {};
  const regex = new RegExp(escapeRegExp(query.trim()), "i");
  return {
    $or: [
      ...fields.flatMap((field) => [
        { [`${field}.fa`]: regex },
        { [`${field}.en`]: regex },
        { [`${field}.ar`]: regex },
      ]),
      ...plainFields.map((field) => ({ [field]: regex })),
    ],
  };
};

export const listSort = (sort = "order", language = "fa") => {
  if (sort === "newest") return { createdAt: -1 };
  if (sort === "oldest") return { createdAt: 1 };
  if (sort === "name") return { [`name.${language}`]: 1, sortOrder: 1, createdAt: -1 };
  return { sortOrder: 1, createdAt: -1 };
};

export const applyAdminStateFilters = (filter, query) => {
  const featured = toBoolean(query.featured);
  const published = toBoolean(query.published);

  if (featured !== undefined) filter.isFeatured = featured;

  if (query.status === "draft") filter.isPublished = false;
  else if (query.status === "published") filter.isPublished = true;
  else if (published !== undefined) filter.isPublished = published;

  return filter;
};

export const populateProductCards = (query) =>
  query
    .populate({ path: "brandId", select: "name slug logo" })
    .populate({ path: "categoryId", select: "name slug image icon" });
