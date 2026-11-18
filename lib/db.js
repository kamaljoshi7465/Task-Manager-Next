import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is missing in .env.local");
}

export async function connectDB() {
  try {
    if (mongoose.connection.readyState === 1) {
      return;
    }

    await mongoose.connect(MONGODB_URI);

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    throw error;
  }
}