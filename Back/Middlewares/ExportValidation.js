import User from "../Models/UserMd.js";
import { verifyAccessToken } from "../Utils/AuthToken.js";

export const exportValidation = async (req, res, next) => {
  req.userId = null;
  req.role = null;
  req.authError = null;

  const authorization = req.headers.authorization;
  if (!authorization) return next();

  const [scheme, token] = authorization.split(" ");
  if (scheme !== "Bearer" || !token) {
    req.authError = "INVALID_AUTH_HEADER";
    return next();
  }

  try {
    const payload = verifyAccessToken(token);
    const user = await User.findOne({
      _id: payload.id,
      isActive: true,
      role: "admin",
    }).select("role +tokenVersion");

    if (!user || Number(payload.tokenVersion) !== Number(user.tokenVersion || 0)) {
      req.authError = "INVALID_OR_REVOKED_TOKEN";
      return next();
    }

    req.userId = user._id.toString();
    req.role = user.role;
    return next();
  } catch (error) {
    req.authError = "INVALID_OR_EXPIRED_TOKEN";
    return next();
  }
};
