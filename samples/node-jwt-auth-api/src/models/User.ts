import mongoose, { Document, Schema } from "mongoose";
import { UserRole } from "../enums/UserRole";

interface IUser extends Document {
  name: string;
  contactNo: number;
  email: string;
  password: string;
  role: UserRole;
  refreshToken?: string;
  resetPasswordToken?: string;
  resetPasswordExpiry?: Date;
}

const userSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    contactNo: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
      required: true,
    },
    refreshToken: String,
    resetPasswordToken: String,
    resetPasswordExpiry: Date,
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", userSchema);
