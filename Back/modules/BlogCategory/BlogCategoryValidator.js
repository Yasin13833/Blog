import { body } from "express-validator";
import { statusValidator } from "../../Utils/commonValidator.js";

const namesRequired = ["fa", "en", "ar"].map((lang) =>
  body(`translations.${lang}.name`).trim().notEmpty().isLength({ min: 1, max: 150 })
);

const namesOptional = ["fa", "en", "ar"].map((lang) =>
  body(`translations.${lang}.name`).optional().isString().trim().isLength({ min: 1, max: 150 })
);

const descriptionsOptional = ["fa", "en", "ar"].map((lang) =>
  body(`translations.${lang}.description`).optional().isString().isLength({ max: 5000 })
);

export const categoryCreateValidation = [
  ...namesRequired,
  ...descriptionsOptional,
  body("parent").optional({ values: "null" }).isMongoId(),
  statusValidator,
];

export const categoryUpdateValidation = [
  ...namesOptional,
  ...descriptionsOptional,
  body("parent").optional({ values: "null" }).isMongoId(),
  statusValidator,
];
