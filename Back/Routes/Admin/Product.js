import express from "express";
import {
  createProduct,
  getAdminProduct,
  getAdminProducts,
  publishProduct,
  removeProduct,
  reorderProducts,
  unpublishProduct,
  updateProduct,
} from "../../Controllers/ProductCn.js";
import { validateRequest } from "../../Middleware/ValidateRequest.js";
import {
  validateMongoIdParam,
  validateProductCreate,
  validateProductPatch,
  validateReorder,
} from "../../Validators/Catalog.js";
import { validateAdminListQuery } from "../../Validators/Request.js";

/**
 * @swagger
 * tags:
 *   - name: Admin - Products
 *     description: Product management
 * /api/admin/products:
 *   get:
 *     tags: [Admin - Products]
 *     summary: List all products including drafts
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - $ref: '#/components/parameters/Page'
 *       - $ref: '#/components/parameters/Limit'
 *       - $ref: '#/components/parameters/AdminStatus'
 *       - $ref: '#/components/parameters/Featured'
 *       - $ref: '#/components/parameters/Search'
 *       - $ref: '#/components/parameters/Sort'
 *       - in: query
 *         name: brandId
 *         schema: { type: string }
 *       - in: query
 *         name: categoryId
 *         schema: { type: string }
 *     responses:
 *       200: { $ref: '#/components/responses/Success' }
 *   post:
 *     tags: [Admin - Products]
 *     summary: Create product
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/ProductInput' }
 *     responses:
 *       201: { $ref: '#/components/responses/Success' }
 *       400: { $ref: '#/components/responses/ValidationError' }
 * /api/admin/products/reorder:
 *   patch:
 *     tags: [Admin - Products]
 *     summary: Bulk update product sort order for drag and drop
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/ReorderInput' }
 *     responses:
 *       200: { $ref: '#/components/responses/Success' }
 * /api/admin/products/{id}:
 *   get:
 *     tags: [Admin - Products]
 *     summary: Get product by ID or localized slug
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { $ref: '#/components/responses/Success' }
 *       404: { $ref: '#/components/responses/NotFound' }
 *   patch:
 *     tags: [Admin - Products]
 *     summary: Partially update product by MongoDB ID
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
 *           schema: { $ref: '#/components/schemas/ProductPatch' }
 *     responses:
 *       200: { $ref: '#/components/responses/Success' }
 *   delete:
 *     tags: [Admin - Products]
 *     summary: Delete product
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { $ref: '#/components/responses/Success' }
 * /api/admin/products/{id}/publish:
 *   patch:
 *     tags: [Admin - Products]
 *     summary: Publish a product after checking brand and category publication
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { $ref: '#/components/responses/Success' }
 * /api/admin/products/{id}/unpublish:
 *   patch:
 *     tags: [Admin - Products]
 *     summary: Unpublish a product
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
  .get(validateRequest({ query: validateAdminListQuery }), getAdminProducts)
  .post(validateRequest({ body: validateProductCreate }), createProduct);
router.patch("/reorder", validateRequest({ body: validateReorder }), reorderProducts);
router.patch(
  "/:id/publish",
  validateRequest({ params: validateMongoIdParam }),
  publishProduct
);
router.patch(
  "/:id/unpublish",
  validateRequest({ params: validateMongoIdParam }),
  unpublishProduct
);
router.get("/:id", getAdminProduct);
router.patch(
  "/:id",
  validateRequest({ params: validateMongoIdParam, body: validateProductPatch }),
  updateProduct
);
router.delete("/:id", validateRequest({ params: validateMongoIdParam }), removeProduct);
export default router;
