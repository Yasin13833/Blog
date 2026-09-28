import express from "express";
import { create, getAll, getOne, remove, update } from "./BrandCtrl.js";
import IsAdmin from "../../Middlewares/RequireAdmin.js";
import validateRequest from "../../Middlewares/ValidateRequest.js";
import { mongoIdParam, languageQuery } from "../../Utils/commonValidator.js";
import { brandCreateValidation, brandUpdateValidation } from "./BrandValidator.js";

const router = express.Router();

router.get("/", getAll);
router.post("/", IsAdmin, brandCreateValidation, validateRequest, create);
router.get("/:identifier", languageQuery, validateRequest, getOne);
router.patch("/:id", IsAdmin, mongoIdParam(), brandUpdateValidation, validateRequest, update);
router.delete("/:id", IsAdmin, mongoIdParam(), validateRequest, remove);

export default router;
