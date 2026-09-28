import { HandleERROR } from "vanta-api";

const IsLogin = (req, res, next) => {
  if (!req.userId || !req.role) {
    return next(new HandleERROR("Authentication is required", 401));
  }
  return next();
};

export default IsLogin;
