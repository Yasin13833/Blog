import express from "express";
import { getDashboardStatistics } from "../../Controllers/DashboardCn.js";

/**
 * @swagger
 * tags:
 *   - name: Admin - Dashboard
 *     description: Admin dashboard statistics
 * /api/admin/dashboard:
 *   get:
 *     tags: [Admin - Dashboard]
 *     summary: Get catalog counts and recent products
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { $ref: '#/components/responses/Success' }
 */
const router = express.Router();
router.get("/", getDashboardStatistics);
export default router;
