import { body } from "express-validator";
import { statusValidator } from "../../Utils/commonValidator.js";

const requiredTranslations = ["fa", "en", "ar"].flatMap((lang) => [
  body(`translations.${lang}.title`).trim().notEmpty().isLength({ min: 1, max: 250 }),
  body(`translations.${lang}.content`).isString().notEmpty(),
  body(`translations.${lang}.excerpt`).optional().isString().isLength({ max: 1000 }),
]);

const optionalTranslations = ["fa", "en", "ar"].flatMap((lang) => [
  body(`translations.${lang}.title`).optional().isString().trim().isLength({ min: 1, max: 250 }),
  body(`translations.${lang}.content`).optional().isString(),
  body(`translations.${lang}.excerpt`).optional().isString().isLength({ max: 1000 }),
]);

export const postCreateValidation = [
  ...requiredTranslations,
  body("blogCategoryId").isMongoId(),
  body("relatedProducts").optional().isArray(),
  body("relatedProducts.*").optional().isMongoId(),
  body("relatedBrands").optional().isArray(),
  body("relatedBrands.*").optional().isMongoId(),
  body("featured").optional().isBoolean(),
  statusValidator,
];

export const postUpdateValidation = [
  ...optionalTranslations,
  body("blogCategoryId").optional().isMongoId(),
  body("relatedProducts").optional().isArray(),
  body("relatedProducts.*").optional().isMongoId(),
  body("relatedBrands").optional().isArray(),
  body("relatedBrands.*").optional().isMongoId(),
  body("featured").optional().isBoolean(),
  statusValidator,
];
