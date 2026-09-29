import express from "express";
import { searchCatalog } from "../../Controllers/SearchCn.js";
import { validateRequest } from "../../Middleware/ValidateRequest.js";
import { validateSearchQuery } from "../../Validators/Request.js";

/**
 * @swagger
 * tags:
 *   - name: Public - Search
 *     description: Search published catalog content
 * /api/public/search:
 *   get:
 *     tags: [Public - Search]
 *     summary: Search products, brands and product categories
 *     security: []
 *     parameters:
 *       - $ref: '#/components/parameters/Language'
 *       - in: query
 *         name: q
 *         required: true
 *         schema: { type: string, maxLength: 100 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, minimum: 1, maximum: 20, default: 8 }
 *     responses:
 *       200: { $ref: '#/components/responses/Success' }
 *       400: { $ref: '#/components/responses/ValidationError' }
 */
const router = express.Router();
router.get("/", validateRequest({ query: validateSearchQuery }), searchCatalog);
export default router;
