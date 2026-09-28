import express from "express";
import { create, getAll, getOne, remove, update } from "./ProductCategoryCtrl.js";
import IsAdmin from "../../Middlewares/RequireAdmin.js";
import validateRequest from "../../Middlewares/ValidateRequest.js";
import { languageQuery, mongoIdParam } from "../../Utils/commonValidator.js";
import { categoryCreateValidation, categoryUpdateValidation } from "./ProductCategoryValidator.js";

const router = express.Router();

router.get("/", getAll);
router.post("/", IsAdmin, categoryCreateValidation, validateRequest, create);
router.get("/:identifier", languageQuery, validateRequest, getOne);
router.patch("/:id", IsAdmin, mongoIdParam(), categoryUpdateValidation, validateRequest, update);
router.delete("/:id", IsAdmin, mongoIdParam(), validateRequest, remove);

export default router;
