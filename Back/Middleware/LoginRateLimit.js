import { ApiError } from "../Utils/Api.js";

const attempts = new Map();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILURES = 5;

const getKey = (req) => {
  const username = String(req.body?.username || "").trim().toLowerCase();
  return `${req.ip || req.socket?.remoteAddress || "unknown"}:${username}`;
};

const getFreshEntry = (key) => {
  const entry = attempts.get(key);
  if (!entry) return null;
  if (Date.now() >= entry.resetAt) {
    attempts.delete(key);
    return null;
  }
  return entry;
};

export const loginRateLimit = (req, res, next) => {
  const entry = getFreshEntry(getKey(req));
  if (!entry || entry.count < MAX_FAILURES) return next();

  const retryAfterSeconds = Math.max(1, Math.ceil((entry.resetAt - Date.now()) / 1000));
  res.setHeader("Retry-After", String(retryAfterSeconds));
  return next(
    new ApiError(
      "Too many failed login attempts. Try again later.",
      429,
      "LOGIN_RATE_LIMITED",
      null,
      { retryAfterSeconds }
    )
  );
};

export const recordFailedLogin = (req) => {
  const key = getKey(req);
  const entry = getFreshEntry(key);
  attempts.set(key, {
    count: (entry?.count || 0) + 1,
    resetAt: entry?.resetAt || Date.now() + WINDOW_MS,
  });

  if (attempts.size > 5000) {
    for (const [attemptKey, attempt] of attempts.entries()) {
      if (Date.now() >= attempt.resetAt) attempts.delete(attemptKey);
    }
  }
};

export const clearLoginAttempts = (req) => attempts.delete(getKey(req));
