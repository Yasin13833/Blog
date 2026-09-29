import { ApiError } from "../Utils/Api.js";

const IsAdmin = (req, res, next) => {
  if (!req.userId || !req.role) {
    const code = req.authError ? "INVALID_OR_EXPIRED_TOKEN" : "AUTH_REQUIRED";
    return next(new ApiError("Authentication is required", 401, code));
  }

  if (req.role !== "admin") {
    return next(new ApiError("Admin access is required", 403, "ADMIN_REQUIRED"));
  }

  next();
};

export default IsAdmin;
