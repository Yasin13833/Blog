import { ApiError } from "../Utils/Api.js";

const mongooseValidationErrors = (error) =>
  Object.fromEntries(
    Object.entries(error.errors || {}).map(([path, item]) => [path, item.message])
  );

const duplicateErrors = (error) => {
  const fields = Object.keys(error.keyPattern || error.keyValue || {});
  return Object.fromEntries(fields.map((field) => [field, `${field} must be unique`]));
};

const isApiError = (error) => error instanceof ApiError || error?.name === "ApiError";

export const notFoundHandler = (req, res, next) =>
  next(new ApiError("Route not found", 404, "ROUTE_NOT_FOUND"));

export const errorHandler = (error, req, res, next) => {
  let normalized = error;

  if (error instanceof SyntaxError && error?.status === 400 && "body" in error) {
    normalized = new ApiError("Invalid JSON body", 400, "INVALID_JSON");
  } else if (error?.code === 11000) {
    normalized = new ApiError(
      "A unique value already exists",
      409,
      "DUPLICATE_VALUE",
      duplicateErrors(error)
    );
  } else if (error?.name === "CastError") {
    normalized = new ApiError("Invalid identifier", 400, "INVALID_IDENTIFIER", {
      [error.path || "id"]: "Invalid identifier",
    });
  } else if (error?.name === "ValidationError") {
    normalized = new ApiError(
      "Validation failed",
      400,
      "VALIDATION_ERROR",
      mongooseValidationErrors(error)
    );
  } else if (error?.name === "MulterError") {
    normalized = new ApiError(error.message, 400, "UPLOAD_ERROR");
  } else if (error?.message === "Origin is not allowed by CORS") {
    normalized = new ApiError(error.message, 403, "CORS_FORBIDDEN");
  } else if (String(error?.message || "").startsWith("Only ")) {
    normalized = new ApiError(error.message, 400, "UNSUPPORTED_FILE_TYPE");
  }

  // Keep the Stage 3 API error contract for all application/domain errors.
  if (isApiError(normalized)) {
    const statusCode = Number(normalized.statusCode) || 500;
    const payload = {
      success: false,
      message: statusCode >= 500 ? "Internal server error" : normalized.message,
      code: normalized.code || "INTERNAL_ERROR",
    };

    if (normalized.errors && Object.keys(normalized.errors).length) {
      payload.errors = normalized.errors;
    }
    if (normalized.meta && Object.keys(normalized.meta).length) {
      payload.meta = normalized.meta;
    }

    if (statusCode >= 500 && process.env.NODE_ENV !== "test") {
      console.error(normalized);
    }

    return res.status(statusCode).json(payload);
  }

  // Unknown errors continue to vanta-api catchError, registered after this middleware.
  return next(normalized);
};
