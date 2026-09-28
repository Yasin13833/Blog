import jwt from "jsonwebtoken";

export const authContext = (req, res, next) => {
  req.userId = null;
  req.role = null;

  const authorization = req.headers.authorization;
  if (!authorization?.startsWith("Bearer ")) return next();

  const token = authorization.slice(7).trim();
  if (!token) return next();

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.id || null;
    req.role = payload.role || null;
  } catch {
    req.userId = null;
    req.role = null;
  }

  return next();
};
