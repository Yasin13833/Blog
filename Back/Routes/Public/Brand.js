import express from "express";
import { getPublicBrand, getPublicBrands } from "../../Controllers/BrandCn.js";
import { validateRequest } from "../../Middleware/ValidateRequest.js";
import { validateRelationDetailQuery, validatePublicListQuery } from "../../Validators/Request.js";

/**
 * @swagger
 * tags:
 *   - name: Public - Brands
 *     description: Published brands
 * /api/public/brands:
 *   get:
 *     tags: [Public - Brands]
 *     summary: List published brands
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
 * /api/public/brands/{identifier}:
 *   get:
 *     tags: [Public - Brands]
 *     summary: Get brand detail with published products
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
router.get("/", validateRequest({ query: validatePublicListQuery }), getPublicBrands);
router.get("/:identifier", validateRequest({ query: validateRelationDetailQuery }), getPublicBrand);
export default router;
