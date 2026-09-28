import { body } from "express-validator";
import { optionalLocalizedField, statusValidator } from "../../Utils/commonValidator.js";

export const brandCreateValidation = [
  ...["fa", "en", "ar"].map((lang) =>
    body(`translations.${lang}.name`)
      .trim()
      .notEmpty()
      .isLength({ min: 1, max: 150 })
  ),
  ...["fa", "en", "ar"].map((lang) =>
    body(`translations.${lang}.shortDescription`)
      .optional()
      .isString()
      .isLength({ max: 500 })
  ),
  ...["fa", "en", "ar"].map((lang) =>
    body(`translations.${lang}.description`)
      .optional()
      .isString()
      .isLength({ max: 10000 })
  ),
  body("website").optional({ values: "falsy" }).isURL({ require_protocol: true }),
  body("foundedYear").optional().isInt({ min: 1000, max: 2200 }),
  statusValidator,
  body("featured").optional().isBoolean(),
];

export const brandUpdateValidation = [
  ...["fa", "en", "ar"].map((lang) =>
    body(`translations.${lang}.name`)
      .optional()
      .isString()
      .trim()
      .isLength({ min: 1, max: 150 })
  ),
  ...optionalLocalizedField("country", { max: 100 }),
  statusValidator,
  body("featured").optional().isBoolean(),
  body("website").optional({ values: "falsy" }).isURL({ require_protocol: true }),
];
