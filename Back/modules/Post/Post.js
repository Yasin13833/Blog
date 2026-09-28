import express from "express";
import { create, getAll, getOne, remove, update } from "./PostCtrl.js";
import IsAdmin from "../../Middlewares/RequireAdmin.js";
import validateRequest from "../../Middlewares/ValidateRequest.js";
import { languageQuery, mongoIdParam } from "../../Utils/commonValidator.js";
import { postCreateValidation, postUpdateValidation } from "./PostValidator.js";

const router = express.Router();

router.get("/", getAll);
router.post("/", IsAdmin, postCreateValidation, validateRequest, create);
router.get("/:identifier", languageQuery, validateRequest, getOne);
router.patch("/:id", IsAdmin, mongoIdParam(), postUpdateValidation, validateRequest, update);
router.delete("/:id", IsAdmin, mongoIdParam(), validateRequest, remove);

export default router;
