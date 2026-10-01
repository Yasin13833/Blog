import "./Config/Environment.js";
import express from "express";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import { catchError } from "vanta-api";
import swaggerUi from "swagger-ui-express";
import { exportValidation } from "./Middleware/ExportValidation.js";
import { errorHandler, notFoundHandler } from "./Middleware/ErrorHandler.js";
import IsAdmin from "./Middleware/IsAdmin.js";
import PublicLanguage from "./Middleware/PublicLanguage.js";
import authRouter from "./Routes/Auth.js";
import publicBrandRouter from "./Routes/Public/Brand.js";
import publicProductCategoryRouter from "./Routes/Public/ProductCategory.js";
import publicProductRouter from "./Routes/Public/Product.js";
import publicSearchRouter from "./Routes/Public/Search.js";
import publicHomeRouter from "./Routes/Public/Home.js";
import adminBrandRouter from "./Routes/Admin/Brand.js";
import adminProductCategoryRouter from "./Routes/Admin/ProductCategory.js";
import adminProductRouter from "./Routes/Admin/Product.js";
import adminDashboardRouter from "./Routes/Admin/Dashboard.js";
import adminMediaRouter from "./Routes/Admin/Media.js";
import swaggerSpec from "./Utils/Swagger.js";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
const app = express();

app.disable("x-powered-by");
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = String(process.env.CORS_ORIGINS || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      if (allowedOrigins.length === 0 && process.env.NODE_ENV !== "production") {
        return callback(null, true);
      }
      return callback(new Error("Origin is not allowed by CORS"));
    },
  })
);

app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  next();
});

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false, limit: "1mb" }));
app.use("/upload", express.static(path.join(__dirname, "Public"), { maxAge: "1d" }));
app.use(exportValidation);

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Service is healthy",
    data: { service: "product-catalog-api", version: "3.0.1" },
  });
});

app.use("/api/auth", authRouter);

app.use("/api/public", PublicLanguage);
app.use("/api/public/home", publicHomeRouter);
app.use("/api/public/brands", publicBrandRouter);
app.use("/api/public/product-categories", publicProductCategoryRouter);
app.use("/api/public/products", publicProductRouter);
app.use("/api/public/search", publicSearchRouter);

app.use("/api/admin", IsAdmin);
app.use("/api/admin/dashboard", adminDashboardRouter);
app.use("/api/admin/brands", adminBrandRouter);
app.use("/api/admin/product-categories", adminProductCategoryRouter);
app.use("/api/admin/products", adminProductRouter);
app.use("/api/admin/media", adminMediaRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(notFoundHandler);
app.use(errorHandler);
app.use(catchError);

export default app;
