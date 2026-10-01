import express from "express";
import {
  createBrand,
  getAdminBrand,
  getAdminBrands,
  publishBrand,
  removeBrand,
  reorderBrands,
  unpublishBrand,
  updateBrand,
} from "../../Controllers/BrandCn.js";
import { validateRequest } from "../../Middleware/ValidateRequest.js";
import {
  validateBrandCreate,
  validateBrandPatch,
  validateMongoIdParam,
  validateReorder,
} from "../../Validators/Catalog.js";
import { validateAdminListQuery } from "../../Validators/Request.js";

/**
 * @swagger
 * tags:
 *   - name: Admin - Brands
 *     description: Brand management
 * /api/admin/brands:
 *   get:
 *     tags: [Admin - Brands]
 *     summary: List brands including drafts
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - $ref: '#/components/parameters/Page'
 *       - $ref: '#/components/parameters/Limit'
 *       - $ref: '#/components/parameters/AdminStatus'
 *       - $ref: '#/components/parameters/Featured'
 *       - $ref: '#/components/parameters/Search'
 *       - $ref: '#/components/parameters/Sort'
 *     responses:
 *       200: { $ref: '#/components/responses/Success' }
 *   post:
 *     tags: [Admin - Brands]
 *     summary: Create brand
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/BrandInput' }
 *     responses:
 *       201: { $ref: '#/components/responses/Success' }
 * /api/admin/brands/reorder:
 *   patch:
 *     tags: [Admin - Brands]
 *     summary: Bulk update brand sort order
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/ReorderInput' }
 *     responses:
 *       200: { $ref: '#/components/responses/Success' }
 * /api/admin/brands/{id}:
 *   get:
 *     tags: [Admin - Brands]
 *     summary: Get brand by ID or localized slug
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { $ref: '#/components/responses/Success' }
 *   patch:
 *     tags: [Admin - Brands]
 *     summary: Partially update brand by MongoDB ID
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/BrandPatch' }
 *     responses:
 *       200: { $ref: '#/components/responses/Success' }
 *   delete:
 *     tags: [Admin - Brands]
 *     summary: Delete an empty brand
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { $ref: '#/components/responses/Success' }
 * /api/admin/brands/{id}/publish:
 *   patch:
 *     tags: [Admin - Brands]
 *     summary: Publish brand
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { $ref: '#/components/responses/Success' }
 * /api/admin/brands/{id}/unpublish:
 *   patch:
 *     tags: [Admin - Brands]
 *     summary: Unpublish brand if it has no published products
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { $ref: '#/components/responses/Success' }
 */

const router = express.Router();
router
  .route("/")
  .get(validateRequest({ query: validateAdminListQuery }), getAdminBrands)
  .post(validateRequest({ body: validateBrandCreate }), createBrand);
router.patch("/reorder", validateRequest({ body: validateReorder }), reorderBrands);
router.patch("/:id/publish", validateRequest({ params: validateMongoIdParam }), publishBrand);
router.patch("/:id/unpublish", validateRequest({ params: validateMongoIdParam }), unpublishBrand);
router.get("/:id", getAdminBrand);
router.patch(
  "/:id",
  validateRequest({ params: validateMongoIdParam, body: validateBrandPatch }),
  updateBrand
);
router.delete("/:id", validateRequest({ params: validateMongoIdParam }), removeBrand);
export default router;
