import express from "express";
import { create, getAll, getOne, remove, update } from "./ProductCtrl.js";
import IsAdmin from "../../Middlewares/RequireAdmin.js";
import validateRequest from "../../Middlewares/ValidateRequest.js";
import { languageQuery, mongoIdParam } from "../../Utils/commonValidator.js";
import { productCreateValidation, productUpdateValidation } from "./ProductValidator.js";

const router = express.Router();

router.get("/", getAll);
router.post("/", IsAdmin, productCreateValidation, validateRequest, create);
router.get("/:identifier", languageQuery, validateRequest, getOne);
router.patch("/:id", IsAdmin, mongoIdParam(), productUpdateValidation, validateRequest, update);
router.delete("/:id", IsAdmin, mongoIdParam(), validateRequest, remove);

export default router;
