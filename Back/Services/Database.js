import mongoose from "mongoose";

export const connectDatabase = async () => {
  const databaseUrl = process.env.MONGODB_URI || process.env.DATA_BASE;
  if (!databaseUrl) throw new Error("MONGODB_URI or DATA_BASE is required");

  await mongoose.connect(databaseUrl, {
    serverSelectionTimeoutMS: 10000,
  });

  return mongoose.connection;
};

export const disconnectDatabase = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
  }
};
