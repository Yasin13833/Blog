import { body } from "express-validator";

export const bootstrapAdminValidation = [
  body("fullName").trim().isLength({ min: 2, max: 100 }),
  body("username")
    .trim()
    .toLowerCase()
    .isLength({ min: 3, max: 50 })
    .matches(/^[a-z0-9._-]+$/i)
    .withMessage("Username can contain letters, numbers, dot, underscore and hyphen"),
  body("password")
    .isLength({ min: 8, max: 128 })
    .matches(/[a-z]/)
    .matches(/[A-Z]/)
    .matches(/[0-9]/)
    .withMessage("Password must include uppercase, lowercase and number"),
];

export const loginValidation = [
  body("username").trim().notEmpty().isLength({ max: 50 }),
  body("password").notEmpty().isLength({ max: 128 }),
];
