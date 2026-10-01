import express from "express";
import { removeMedia, uploadDocument, uploadImage, uploadImages } from "../../Controllers/MediaCn.js";
import { documentUpload, imageUpload } from "../../Utils/Upload.js";

/**
 * @swagger
 * tags:
 *   - name: Admin - Media
 *     description: Managed image and PDF uploads
 * /api/admin/media/image:
 *   post:
 *     tags: [Admin - Media]
 *     summary: Upload one image
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [file]
 *             properties:
 *               file: { type: string, format: binary }
 *     responses:
 *       201: { $ref: '#/components/responses/Success' }
 * /api/admin/media/images:
 *   post:
 *     tags: [Admin - Media]
 *     summary: Upload up to 10 images
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [files]
 *             properties:
 *               files:
 *                 type: array
 *                 items: { type: string, format: binary }
 *     responses:
 *       201: { $ref: '#/components/responses/Success' }
 * /api/admin/media/document:
 *   post:
 *     tags: [Admin - Media]
 *     summary: Upload one PDF document
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [file]
 *             properties:
 *               file: { type: string, format: binary }
 *     responses:
 *       201: { $ref: '#/components/responses/Success' }
 * /api/admin/media/{filename}:
 *   delete:
 *     tags: [Admin - Media]
 *     summary: Delete an unreferenced uploaded file
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: filename
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { $ref: '#/components/responses/Success' }
 *       409: { description: Media is still in use by catalog content }
 */
const router = express.Router();
router.post("/image", imageUpload.single("file"), uploadImage);
router.post("/images", imageUpload.array("files", 10), uploadImages);
router.post("/document", documentUpload.single("file"), uploadDocument);
router.delete("/:filename", removeMedia);
export default router;
