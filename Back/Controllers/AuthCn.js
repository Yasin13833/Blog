import bcryptjs from "bcryptjs";
import User from "../Models/UserMd.js";
import { catchAsync } from "vanta-api";
import { ApiError, sendSuccess } from "../Utils/Api.js";
import { issueAccessToken } from "../Utils/AuthToken.js";
import { clearLoginAttempts, recordFailedLogin } from "../Middleware/LoginRateLimit.js";

const safeUser = (user) => ({
  _id: user._id,
  fullName: user.fullName,
  username: user.username,
  role: user.role,
  isActive: user.isActive,
  lastLoginAt: user.lastLoginAt,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

export const login = catchAsync(async (req, res) => {
  const username = String(req.body.username).trim().toLowerCase();
  const password = String(req.body.password);

  const user = await User.findOne({ username, role: "admin" }).select("+password +tokenVersion");
  if (!user || !user.isActive) {
    recordFailedLogin(req);
    throw new ApiError("Username or password is incorrect", 401, "INVALID_CREDENTIALS");
  }

  const passMatch = await bcryptjs.compare(password, user.password);
  if (!passMatch) {
    recordFailedLogin(req);
    throw new ApiError("Username or password is incorrect", 401, "INVALID_CREDENTIALS");
  }

  clearLoginAttempts(req);
  user.lastLoginAt = new Date();
  await user.save();

  return sendSuccess(res, {
    message: "Login successful",
    data: { user: safeUser(user), token: issueAccessToken(user) },
  });
});

export const me = catchAsync(async (req, res) => {
  const user = await User.findOne({ _id: req.userId, isActive: true, role: "admin" });
  if (!user) throw new ApiError("User not found", 404, "ADMIN_NOT_FOUND");
  return sendSuccess(res, { message: "Admin profile fetched successfully", data: safeUser(user) });
});

export const changePassword = catchAsync(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const user = await User.findById(req.userId).select("+password +tokenVersion");
  if (!user || !user.isActive) throw new ApiError("User not found", 404, "ADMIN_NOT_FOUND");

  const passMatch = await bcryptjs.compare(currentPassword, user.password);
  if (!passMatch) throw new ApiError("Current password is incorrect", 401, "INVALID_CURRENT_PASSWORD");

  user.password = await bcryptjs.hash(newPassword, 12);
  user.tokenVersion = (user.tokenVersion || 0) + 1;
  await user.save();

  return sendSuccess(res, {
    message: "Password changed successfully",
    data: { token: issueAccessToken(user) },
  });
});
