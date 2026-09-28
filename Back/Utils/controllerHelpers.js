import mongoose from "mongoose";
import { HandleERROR } from "vanta-api";
import { getLanguage, omitQueryKeys } from "./localized.js";

export const publicStatusFilter = (req) =>
  req.role === "admin" ? {} : { status: "published" };

export const identifierFilter = (identifier, language) => {
  if (mongoose.isValidObjectId(identifier)) return { _id: identifier };
  return { [`slug.${getLanguage(language)}`]: identifier };
};

export const vantaQuery = (req, extraOmissions = []) =>
  omitQueryKeys(req.query, ["lang", ...extraOmissions]);

export const assertFound = (result, message = "Resource not found") => {
  if (!result?.data?.length) throw new HandleERROR(message, 404);
  return result.data[0];
};

export const applyDocumentPatch = (document, payload, prefix = "") => {
  const immutableRootFields = new Set([
    "_id",
    "__v",
    "createdAt",
    "updatedAt",
    "createdBy",
  ]);

  for (const [key, value] of Object.entries(payload || {})) {
    if (
      key.startsWith("$") ||
      key.includes(".") ||
      ["__proto__", "prototype", "constructor"].includes(key)
    ) {
      throw new HandleERROR("Invalid update field", 400);
    }

    if (!prefix && immutableRootFields.has(key)) continue;

    const path = prefix ? `${prefix}.${key}` : key;

    if (
      value !== null &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      !(value instanceof Date)
    ) {
      applyDocumentPatch(document, value, path);
      continue;
    }

    document.set(path, value);
  }

  return document;
};
