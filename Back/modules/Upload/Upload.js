import express from "express";
import { removeData, uploadMultiple, uploadSingle } from "./UploadCtrl.js";
import IsAdmin from "../../Middlewares/RequireAdmin.js";
import validateRequest from "../../Middlewares/ValidateRequest.js";
import upload from "../../Utils/uploadFile.js";
import { deleteUploadValidation } from "./UploadValidator.js";

const router = express.Router();

router.post("/", IsAdmin, upload.single("file"), uploadSingle);
router.post("/multi", IsAdmin, upload.array("files", 10), uploadMultiple);
router.delete("/", IsAdmin, deleteUploadValidation, validateRequest, removeData);
router.post("/remove", IsAdmin, deleteUploadValidation, validateRequest, removeData);

export default router;
