import express from "express";
import {
  createProductCategory,
  getAdminProductCategories,
  getAdminProductCategory,
  publishProductCategory,
  removeProductCategory,
  reorderProductCategories,
  unpublishProductCategory,
  updateProductCategory,
} from "../../Controllers/ProductCategoryCn.js";
import { validateRequest } from "../../Middleware/ValidateRequest.js";
import {
  validateCategoryCreate,
  validateCategoryPatch,
  validateMongoIdParam,
  validateReorder,
} from "../../Validators/Catalog.js";
import { validateAdminListQuery } from "../../Validators/Request.js";

/**
 * @swagger
 * tags:
 *   - name: Admin - Product Categories
 *     description: Product category management
 * /api/admin/product-categories:
 *   get:
 *     tags: [Admin - Product Categories]
 *     summary: List product categories including drafts
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
 *     tags: [Admin - Product Categories]
 *     summary: Create product category
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/ProductCategoryInput' }
 *     responses:
 *       201: { $ref: '#/components/responses/Success' }
 * /api/admin/product-categories/reorder:
 *   patch:
 *     tags: [Admin - Product Categories]
 *     summary: Bulk update category sort order
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/ReorderInput' }
 *     responses:
 *       200: { $ref: '#/components/responses/Success' }
 * /api/admin/product-categories/{id}:
 *   get:
 *     tags: [Admin - Product Categories]
 *     summary: Get category by ID or localized slug
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { $ref: '#/components/responses/Success' }
 *   patch:
 *     tags: [Admin - Product Categories]
 *     summary: Partially update category by MongoDB ID
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
 *           schema: { $ref: '#/components/schemas/ProductCategoryPatch' }
 *     responses:
 *       200: { $ref: '#/components/responses/Success' }
 *   delete:
 *     tags: [Admin - Product Categories]
 *     summary: Delete an empty product category
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { $ref: '#/components/responses/Success' }
 * /api/admin/product-categories/{id}/publish:
 *   patch:
 *     tags: [Admin - Product Categories]
 *     summary: Publish category
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { $ref: '#/components/responses/Success' }
 * /api/admin/product-categories/{id}/unpublish:
 *   patch:
 *     tags: [Admin - Product Categories]
 *     summary: Unpublish category if it has no published products
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
  .get(validateRequest({ query: validateAdminListQuery }), getAdminProductCategories)
  .post(validateRequest({ body: validateCategoryCreate }), createProductCategory);
router.patch("/reorder", validateRequest({ body: validateReorder }), reorderProductCategories);
router.patch(
  "/:id/publish",
  validateRequest({ params: validateMongoIdParam }),
  publishProductCategory
);
router.patch(
  "/:id/unpublish",
  validateRequest({ params: validateMongoIdParam }),
  unpublishProductCategory
);
router.get("/:id", getAdminProductCategory);
router.patch(
  "/:id",
  validateRequest({ params: validateMongoIdParam, body: validateCategoryPatch }),
  updateProductCategory
);
router.delete("/:id", validateRequest({ params: validateMongoIdParam }), removeProductCategory);
export default router;
