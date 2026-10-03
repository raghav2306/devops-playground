import { Request, Response } from "express";
import crypto from "crypto";
import { User } from "../models";
import {
  checkPassword,
  CustomError,
  generateAccessToken,
  generateRefreshToken,
  hashPassword,
  passwordGenerator,
  verifyRefreshToken,
} from "../utils";

const { NODE_ENV, BACKEND_URL } = process.env;

if (!NODE_ENV) {
  throw new CustomError("Missing environment variables", 400);
}

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, contactNo } = req.body;

  if (!name || !email || !contactNo) {
    throw new CustomError("Please fill all the fields", 400);
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new CustomError("User Already exists", 409);
  }

  const plainPassword = passwordGenerator();

  const hashedPassword = await hashPassword(plainPassword);

  const user = await User.create({
    name,
    email,
    contactNo,
    password: hashedPassword,
  });

  //Password will be send to that user on their email
  console.log("password", plainPassword);

  res.status(201).json({
    success: true,
    message: "User Added Successfully",
    data: {
      _id: user?._id,
      name: user?.name,
      email: user?.email,
      contactNo: user?.contactNo,
      role: user?.role,
    },
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError("Please fill all the fields.", 400);
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError("No account found with this email address.", 401);
  }

  await checkPassword(password, user.password);

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  user.refreshToken = refreshToken;
  await user.save();

  let cookieOptions = {};
  if (NODE_ENV === "development") {
    cookieOptions = {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    };
  } else if (NODE_ENV === "production") {
    cookieOptions = {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
      secure: true,
      sameSite: "none",
      domain: ".abc.com",
    };
  }

  res.cookie("jwt", refreshToken, cookieOptions);

  res.status(200).json({
    success: true,
    accessToken,
    user: {
      userId: user._id,
      name: user?.name,
      email: user?.email,
      role: user?.role,
    },
  });
};

//For getting new access token
export const refresh = async (req: Request, res: Response) => {
  const token = req?.cookies?.jwt;

  if (!token) {
    throw new CustomError("Session Expired.", 403);
  }

  const decodedToken = verifyRefreshToken(token);

  const user = await User.findById(decodedToken.userId);
  if (!user || user.refreshToken !== token) {
    throw new CustomError("Session expired. Please log in.", 403);
  }

  const accessToken = generateAccessToken(user._id);

  const userObj = {
    userId: user._id,
    name: user?.name,
    email: user?.email,
    role: user?.role,
  };

  res.status(200).json({ success: true, accessToken, user: userObj });
};

export const logout = async (req: Request, res: Response) => {
  const userId = req?.user?._id;
  if (!userId) {
    throw new CustomError("User does not exist", 404);
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new CustomError("User does not exist", 404);
  }

  let cookieOptions = {};
  if (NODE_ENV === "development") {
    cookieOptions = {
      httpOnly: true,
    };
  } else if (NODE_ENV === "production") {
    cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      domain: ".abc.com",
    };
  }

  user.refreshToken = undefined;
  await user.save();

  res.clearCookie("jwt", cookieOptions);

  res.status(204).end();
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    throw new CustomError("Email is required", 400);
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(200).json({
      success: true,
      message:
        "If email address is correct, a reset link has been sent to this mail",
    });
  }

  const resetToken = crypto.randomBytes(32).toString("hex");

  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpiry = new Date(Date.now() + 15 * 60 * 1000);
  await user.save();

  const resetPasswordLink = `${BACKEND_URL}/reset-password?token=${resetToken}`;

  //Reset Link will be Send on email
  console.log("Reset Password link:", resetPasswordLink);

  res.status(200).json({
    success: true,
    message:
      "If email address is correct, a reset link has been sent to this mail",
  });
};

export const resetPassword = async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    throw new CustomError("Please fill all the fields", 400);
  }

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpiry: { $gt: new Date() },
  });

  if (!user) {
    throw new CustomError("Your request expired.", 400);
  }

  const hashedPassword = await hashPassword(newPassword);

  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpiry = undefined;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Password reset successful",
  });
};
