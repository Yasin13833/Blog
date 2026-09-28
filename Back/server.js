import "./Utils/Env.js";
import app from "./app.js";
import { connectDatabase, disconnectDatabase } from "./Services/Database.js";

const port = Number(process.env.PORT || 5000);

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is required");
}

await connectDatabase();
console.log("Database connected successfully");

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Local uploads: http://localhost:${port}/uploads/<filename>`);
  if (process.env.SWAGGER_ENABLED !== "false") {
    console.log(`Swagger UI: http://localhost:${port}/api-docs`);
  }
});

const shutdown = async (signal) => {
  console.log(`${signal} received. Closing server...`);
  server.close(async () => {
    await disconnectDatabase();
    process.exit(0);
  });
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
