import { Request, Response } from "express";
import { User } from "../models";
import { CustomError } from "../utils";
import { UserRole } from "../enums/UserRole";

export const getUserProfile = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const user = await User.findById(userId).select(
    "-password -updatedAt -refreshToken"
  );

  res.status(200).json({
    success: true,
    data: user,
  });
};

export const getManagerDashboard = async (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: "Managerial EndPoint" });
};

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await User.find().select("-password -updatedAt -refreshToken");

  res.status(200).json({ success: true, data: users });
};

export const assignUserRole = async (req: Request, res: Response) => {
  const { userId, role } = req.body;

  if (!userId || !role) {
    throw new CustomError("Please fill all the fields", 400);
  }

  if (!Object.values(UserRole).includes(role)) {
    throw new CustomError("Invalid role selected", 400);
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new CustomError("User not found", 404);
  }

  user.role = role;
  await user.save();

  res.status(200).json({
    success: true,
    message: "User Role updated successfully",
  });
};
