import express from "express";
import { changePassword, login, me } from "../Controllers/AuthCn.js";
import IsAdmin from "../Middleware/IsAdmin.js";
import { loginRateLimit } from "../Middleware/LoginRateLimit.js";
import { validateRequest } from "../Middleware/ValidateRequest.js";
import { validateChangePasswordBody, validateLoginBody } from "../Validators/Request.js";

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Admin authentication
 * /api/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Admin login
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/LoginInput' }
 *     responses:
 *       200: { $ref: '#/components/responses/Success' }
 *       400: { $ref: '#/components/responses/ValidationError' }
 *       401: { $ref: '#/components/responses/Unauthorized' }
 *       429: { description: Too many failed login attempts }
 * /api/auth/me:
 *   get:
 *     tags: [Auth]
 *     summary: Get current admin profile
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { $ref: '#/components/responses/Success' }
 *       401: { $ref: '#/components/responses/Unauthorized' }
 * /api/auth/change-password:
 *   patch:
 *     tags: [Auth]
 *     summary: Change current admin password and revoke previous token
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/ChangePasswordInput' }
 *     responses:
 *       200: { $ref: '#/components/responses/Success' }
 *       400: { $ref: '#/components/responses/ValidationError' }
 *       401: { $ref: '#/components/responses/Unauthorized' }
 */

const router = express.Router();
router.post("/login", validateRequest({ body: validateLoginBody }), loginRateLimit, login);
router.get("/me", IsAdmin, me);
router.patch(
  "/change-password",
  IsAdmin,
  validateRequest({ body: validateChangePasswordBody }),
  changePassword
);
export default router;
