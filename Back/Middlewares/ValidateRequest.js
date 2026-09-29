import { ApiError } from "../Utils/Api.js";

export const validateRequest = (validators = {}) => (req, res, next) => {
  const errors = {};

  for (const [source, validator] of Object.entries(validators)) {
    if (typeof validator !== "function") continue;
    const sourceErrors = validator(req[source] || {});
    Object.assign(errors, sourceErrors || {});
  }

  if (Object.keys(errors).length) {
    return next(new ApiError("Validation failed", 400, "VALIDATION_ERROR", errors));
  }

  next();
};
