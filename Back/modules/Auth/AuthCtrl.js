import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { catchAsync, HandleERROR } from "vanta-api";
import User from "./AdminMd.js";

const publicUser = (user) => ({
  id: user._id,
  fullName: user.fullName,
  username: user.username,
  role: user.role,
  isActive: user.isActive,
  lastLoginAt: user.lastLoginAt,
  createdAt: user.createdAt,
});

const signToken = (user) =>
  jwt.sign(
    { id: user._id.toString(), role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
  );

export const bootstrapAdmin = catchAsync(async (req, res, next) => {
  const existingAdmin = await User.exists({ role: "admin" });
  if (existingAdmin) {
    return next(
      new HandleERROR(
        "Admin bootstrap is disabled because an admin already exists",
        403
      )
    );
  }

  const password = await bcryptjs.hash(req.body.password, 12);
  const admin = await User.create({
    fullName: req.body.fullName,
    username: req.body.username,
    password,
    role: "admin",
  });

  const token = signToken(admin);

  return res.status(201).json({
    success: true,
    message: "Initial admin created successfully",
    data: { user: publicUser(admin), token },
  });
});

export const login = catchAsync(async (req, res, next) => {
  const username = req.body.username.toLowerCase().trim();
  const user = await User.findOne({ username }).select("+password");

  if (!user || !(await bcryptjs.compare(req.body.password, user.password))) {
    return next(new HandleERROR("Username or password is incorrect", 401));
  }

  if (user.role !== "admin" || !user.isActive) {
    return next(new HandleERROR("Admin access is not available", 403));
  }

  user.lastLoginAt = new Date();
  await user.save({ validateBeforeSave: false });

  return res.status(200).json({
    success: true,
    message: "Login successful",
    data: { user: publicUser(user), token: signToken(user) },
  });
});

export const me = catchAsync(async (req, res, next) => {
  const admin = await User.findById(req.userId);
  if (!admin) return next(new HandleERROR("Admin not found", 404));

  return res.status(200).json({
    success: true,
    data: publicUser(admin),
  });
});
