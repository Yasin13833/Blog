import { body, param, query } from "express-validator";
import { LANGUAGES } from "./localized.js";

export const requiredLocalizedField = (field, { min = 1, max = 500 } = {}) =>
  LANGUAGES.map((lang) =>
    body(`${field}.${lang}`)
      .trim()
      .notEmpty()
      .withMessage(`${field}.${lang} is required`)
      .isLength({ min, max })
      .withMessage(`${field}.${lang} must be between ${min} and ${max} characters`)
  );

export const optionalLocalizedField = (field, { max = 5000 } = {}) =>
  LANGUAGES.map((lang) =>
    body(`${field}.${lang}`)
      .optional()
      .isString()
      .withMessage(`${field}.${lang} must be a string`)
      .isLength({ max })
      .withMessage(`${field}.${lang} is too long`)
  );

export const statusValidator = body("status")
  .optional()
  .isIn(["draft", "published", "archived"])
  .withMessage("Invalid status");

export const mongoIdParam = (name = "id") =>
  param(name).isMongoId().withMessage(`${name} must be a valid MongoDB id`);

export const languageQuery = query("lang")
  .optional()
  .isIn(["fa", "en", "ar"])
  .withMessage("lang must be fa, en or ar");
