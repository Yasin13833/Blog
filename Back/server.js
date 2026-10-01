import "./Config/Environment.js";
import mongoose from "mongoose";
import app from "./app.js";

const required = ["DATA_BASE", "JWT_SECRET"];
const missing = required.filter((key) => !process.env[key]);
if (missing.length) {
  throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
}

if (process.env.JWT_SECRET.length < 32) {
  throw new Error("JWT_SECRET must contain at least 32 characters");
}

if (
  process.env.NODE_ENV === "production" &&
  process.env.JWT_SECRET.startsWith("replace-with")
) {
  throw new Error("Replace the example JWT_SECRET before running in production");
}

const PORT = Number.parseInt(process.env.PORT, 10) || 5000;

await mongoose.connect(process.env.DATA_BASE);
console.log("Database connected successfully");

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const shutdown = async (signal) => {
  console.log(`${signal} received. Shutting down...`);
  server.close(async () => {
    await mongoose.connection.close();
    process.exit(0);
  });
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
