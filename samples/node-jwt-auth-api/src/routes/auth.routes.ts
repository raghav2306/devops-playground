import { Router } from "express";
import { catchAsync, checkRole, verifyJWT } from "../middlewares";
import {
  registerUser,
  login,
  refresh,
  logout,
  forgotPassword,
  resetPassword,
} from "../controllers";
import { UserRole } from "../enums/UserRole";

export const authRoutes = Router();

authRoutes
  .route("/register-user")
  .post(verifyJWT, checkRole(UserRole.ADMIN), catchAsync(registerUser));

authRoutes.route("/login").post(catchAsync(login));

authRoutes.route("/refresh").get(catchAsync(refresh));

authRoutes.route("/logout").post(verifyJWT, catchAsync(logout));

authRoutes.route("/forgot-password").post(catchAsync(forgotPassword));

authRoutes.route("/reset-password").post(catchAsync(resetPassword));
