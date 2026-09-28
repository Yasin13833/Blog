import express from "express";
import { bootstrapAdmin, login, me } from "./AuthCtrl.js";
import IsAdmin from "../../Middlewares/RequireAdmin.js";
import validateRequest from "../../Middlewares/ValidateRequest.js";
import {
  bootstrapAdminValidation,
  loginValidation,
} from "./AuthValidator.js";

const authRouter = express.Router();

authRouter.post("/bootstrap", bootstrapAdminValidation, validateRequest, bootstrapAdmin);
authRouter.post("/register", bootstrapAdminValidation, validateRequest, bootstrapAdmin);
authRouter.post("/login", loginValidation, validateRequest, login);
authRouter.post("/", loginValidation, validateRequest, login);
authRouter.get("/me", IsAdmin, me);

export default authRouter;
