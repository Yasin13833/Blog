import express from "express";
import { getPublicProduct, getPublicProducts, getRelatedProducts } from "../../Controllers/ProductCn.js";
import { validateRequest } from "../../Middleware/ValidateRequest.js";
import {
  validateProductDetailQuery,
  validatePublicProductListQuery,
  validateRelatedQuery,
} from "../../Validators/Request.js";

/**
 * @swagger
 * tags:
 *   - name: Public - Products
 *     description: Published product catalog
 * /api/public/products:
 *   get:
 *     tags: [Public - Products]
 *     summary: List published products
 *     security: []
 *     parameters:
 *       - $ref: '#/components/parameters/Language'
 *       - $ref: '#/components/parameters/Page'
 *       - $ref: '#/components/parameters/Limit'
 *       - $ref: '#/components/parameters/Featured'
 *       - $ref: '#/components/parameters/Search'
 *       - $ref: '#/components/parameters/Sort'
 *       - in: query
 *         name: brand
 *         description: Brand ID or localized slug
 *         schema: { type: string }
 *       - in: query
 *         name: category
 *         description: Category ID or localized slug
 *         schema: { type: string }
 *     responses:
 *       200: { $ref: '#/components/responses/Success' }
 *       400: { $ref: '#/components/responses/ValidationError' }
 * /api/public/products/{identifier}:
 *   get:
 *     tags: [Public - Products]
 *     summary: Get product detail with brand, category and related products
 *     security: []
 *     parameters:
 *       - $ref: '#/components/parameters/Language'
 *       - in: path
 *         name: identifier
 *         required: true
 *         schema: { type: string }
 *       - in: query
 *         name: relatedLimit
 *         schema: { type: integer, minimum: 0, maximum: 20, default: 6 }
 *     responses:
 *       200: { $ref: '#/components/responses/Success' }
 *       404: { $ref: '#/components/responses/NotFound' }
 * /api/public/products/{identifier}/related:
 *   get:
 *     tags: [Public - Products]
 *     summary: Get related products only
 *     security: []
 *     parameters:
 *       - $ref: '#/components/parameters/Language'
 *       - in: path
 *         name: identifier
 *         required: true
 *         schema: { type: string }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, minimum: 1, maximum: 20, default: 6 }
 *     responses:
 *       200: { $ref: '#/components/responses/Success' }
 */

const router = express.Router();
router.get("/", validateRequest({ query: validatePublicProductListQuery }), getPublicProducts);
router.get(
  "/:identifier/related",
  validateRequest({ query: validateRelatedQuery }),
  getRelatedProducts
);
router.get("/:identifier", validateRequest({ query: validateProductDetailQuery }), getPublicProduct);
export default router;
