import { body } from "express-validator";

export const deleteUploadValidation = [
  body().custom((value) => {
    if (!value?.filename && !value?.url) {
      throw new Error("filename or url is required");
    }
    return true;
  }),
  body("filename").optional().isString().trim().isLength({ min: 1, max: 255 }),
  body("url").optional().isString().trim().isLength({ min: 1, max: 1000 }),
];
