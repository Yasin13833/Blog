import "./Utils/Env.js";
import express from "express";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import helmet from "helmet";
import { catchError } from "vanta-api";
import { rateLimit } from "express-rate-limit";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec, swaggerUiOptions } from "./Utils/Swagger.js";

import { authContext } from "./Middlewares/AuthContext.js";
import handleUploadError from "./Middlewares/HandleUploadError.js";

import authRouter from "./Modules/Auth/Auth.js";
import brandRouter from "./Modules/Brand/Brand.js";
import productRouter from "./Modules/Product/Product.js";
import productCategoryRouter from "./Modules/ProductCategory/ProductCategory.js";
import blogCategoryRouter from "./Modules/BlogCategory/BlogCategory.js";
import postRouter from "./Modules/Post/Post.js";
import uploadRouter from "./modules/Upload/Upload.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: Number(process.env.RATE_LIMIT_MAX || 100),
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests from this IP, please try again after 15 minutes",
  },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: Number(process.env.AUTH_RATE_LIMIT_MAX || 10),
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many authentication attempts, please try again after 15 minutes",
  },
});

app.disable("x-powered-by");

if (process.env.TRUST_PROXY === "true") {
  app.set("trust proxy", 1);
}

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true, limit: "2mb" }));
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));

const allowedOrigins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(null, false);
    },
    credentials: true,
  })
);

app.use(limiter);

// Uploaded files are stored in Public/uploads and served from /uploads.
app.use("/uploads", express.static(path.join(__dirname, "Public", "uploads")));

// Reads a Bearer token when present and exposes req.userId / req.role.
// Protected module routes still enforce admin access internally.
app.use(authContext);

app.use("/api/auth", authLimiter, authRouter);
app.use("/api/brands", brandRouter);
app.use("/api/products", productRouter);
app.use("/api/product-categories", productCategoryRouter);
app.use("/api/blog-categories", blogCategoryRouter);
app.use("/api/categories", blogCategoryRouter);
app.use("/api/posts", postRouter);
app.use("/api/upload", uploadRouter);

const swaggerEnabled = process.env.SWAGGER_ENABLED !== "false";

if (swaggerEnabled) {
  app.get("/api-docs.json", (req, res) => {
    return res.status(200).json(swaggerSpec);
  });

  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, swaggerUiOptions)
  );
}

app.get("/health", (req, res) => {
  return res.status(200).json({
    success: true,
    service: "blog-api",
    architecture: "modular-monolith",
    languages: ["fa", "en", "ar"],
    uploadStorage: "local",
    swagger: swaggerEnabled ? "/api-docs" : null,
  });
});

app.use((req, res) => {
  return res.status(404).json({
    message: "Route Not found",
    success: false,
  });
});

app.use(handleUploadError);
app.use(catchError);

export default app;
