import mongoose from "mongoose";
import { CustomError } from "../utils";

export const connectDB = async () => {
  const DB_URI = process.env.DB_URI;

  if (!DB_URI) {
    throw new CustomError("Missing Database Connection String", 400);
  }

  try {
    await mongoose.connect(DB_URI);
    console.log("Connected to Database successfully");
  } catch (err) {
    throw err;
  }
};

