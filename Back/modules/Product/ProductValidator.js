import { body } from "express-validator";
import { statusValidator } from "../../Utils/commonValidator.js";

const names = (optional = false) =>
  ["fa", "en", "ar"].map((lang) => {
    const validator = body(`translations.${lang}.name`);
    if (optional) validator.optional();
    return validator.trim().notEmpty().isLength({ min: 1, max: 200 });
  });

export const productCreateValidation = [
  ...names(false),
  body("brandId").isMongoId(),
  body("categoryId").isMongoId(),
  body("sku").optional({ values: "falsy" }).isString().isLength({ max: 100 }),
  body("price").optional({ values: "null" }).isFloat({ min: 0 }),
  body("currency").optional().isString().isLength({ min: 3, max: 6 }),
  body("productUrl").optional({ values: "falsy" }).isURL({ require_protocol: true }),
  body("featured").optional().isBoolean(),
  statusValidator,
];

export const productUpdateValidation = [
  ...names(true),
  body("brandId").optional().isMongoId(),
  body("categoryId").optional().isMongoId(),
  body("price").optional({ values: "null" }).isFloat({ min: 0 }),
  body("featured").optional().isBoolean(),
  statusValidator,
];
