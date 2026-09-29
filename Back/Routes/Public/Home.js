import express from "express";
import { getHome } from "../../Controllers/HomeCn.js";
import { validateRequest } from "../../Middleware/ValidateRequest.js";
import { validateHomeQuery } from "../../Validators/Request.js";

/**
 * @swagger
 * tags:
 *   - name: Public - Home
 *     description: Homepage catalog payload
 * /api/public/home:
 *   get:
 *     tags: [Public - Home]
 *     summary: Get featured brands, categories and products
 *     security: []
 *     parameters:
 *       - $ref: '#/components/parameters/Language'
 *       - in: query
 *         name: limit
 *         schema: { type: integer, minimum: 1, maximum: 20, default: 8 }
 *     responses:
 *       200: { $ref: '#/components/responses/Success' }
 */
const router = express.Router();
router.get("/", validateRequest({ query: validateHomeQuery }), getHome);
export default router;
