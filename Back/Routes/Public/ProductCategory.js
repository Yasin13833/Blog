import express from "express";
import {
  getPublicProductCategories,
  getPublicProductCategory,
} from "../../Controllers/ProductCategoryCn.js";
import { validateRequest } from "../../Middleware/ValidateRequest.js";
import { validateRelationDetailQuery, validatePublicListQuery } from "../../Validators/Request.js";

/**
 * @swagger
 * tags:
 *   - name: Public - Product Categories
 *     description: Published product categories
 * /api/public/product-categories:
 *   get:
 *     tags: [Public - Product Categories]
 *     summary: List published product categories
 *     security: []
 *     parameters:
 *       - $ref: '#/components/parameters/Language'
 *       - $ref: '#/components/parameters/Page'
 *       - $ref: '#/components/parameters/Limit'
 *       - $ref: '#/components/parameters/Featured'
 *       - $ref: '#/components/parameters/Search'
 *       - $ref: '#/components/parameters/Sort'
 *     responses:
 *       200: { $ref: '#/components/responses/Success' }
 * /api/public/product-categories/{identifier}:
 *   get:
 *     tags: [Public - Product Categories]
 *     summary: Get category detail with published products
 *     security: []
 *     parameters:
 *       - $ref: '#/components/parameters/Language'
 *       - in: path
 *         name: identifier
 *         required: true
 *         schema: { type: string }
 *       - in: query
 *         name: productLimit
 *         schema: { type: integer, minimum: 1, maximum: 50, default: 12 }
 *     responses:
 *       200: { $ref: '#/components/responses/Success' }
 *       404: { $ref: '#/components/responses/NotFound' }
 */

const router = express.Router();
router.get("/", validateRequest({ query: validatePublicListQuery }), getPublicProductCategories);
router.get("/:identifier", validateRequest({ query: validateRelationDetailQuery }), getPublicProductCategory);
export default router;
