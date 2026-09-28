import { HandleERROR } from "vanta-api";
import User from "../Modules/Auth/AdminMd.js";

const IsAdmin = async (req, res, next) => {
  if (!req.userId || req.role !== "admin") {
    return next(new HandleERROR("Admin authentication is required", 401));
  }

  const admin = await User.findOne({
    _id: req.userId,
    role: "admin",
    isActive: true,
  }).select("_id role isActive");

  if (!admin) {
    return next(new HandleERROR("Admin access is not available", 403));
  }

  return next();
};

export default IsAdmin;
