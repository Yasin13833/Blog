import { HandleERROR } from "vanta-api";

export class ApiError extends HandleERROR {
  constructor(message, statusCode = 500, code = "INTERNAL_ERROR", errors = null, meta = null) {
    super(message, statusCode);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.code = code;
    this.errors = errors;
    this.meta = meta;
    Error.captureStackTrace?.(this, ApiError);
  }
}

export const paginationMeta = (page, limit, total) => {
  const totalPages = total === 0 ? 0 : Math.ceil(total / limit);
  return {
    page,
    limit,
    total,
    totalPages,
    hasNextPage: totalPages > 0 && page < totalPages,
    hasPrevPage: totalPages > 0 && page > 1,
  };
};

export const sendSuccess = (
  res,
  { statusCode = 200, message = "Request completed successfully", data = null, meta = undefined } = {}
) => {
  const payload = { success: true, message, data };
  if (meta && Object.keys(meta).length) payload.meta = meta;
  return res.status(statusCode).json(payload);
};

export const sendList = (
  res,
  { data = [], page, limit, total, message = "List fetched successfully", meta = {} } = {}
) =>
  sendSuccess(res, {
    message,
    data,
    meta: { ...meta, pagination: paginationMeta(page, limit, total) },
  });
