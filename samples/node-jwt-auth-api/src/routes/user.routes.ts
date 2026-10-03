import { Router } from "express";
import { catchAsync, checkRole, verifyJWT } from "../middlewares";
import {
  getAllUsers,
  getManagerDashboard,
  getUserProfile,
  assignUserRole,
} from "../controllers";
import { UserRole } from "../enums/UserRole";

export const userRoutes = Router();

//GET User Profile
userRoutes
  .route("/profile/:userId")
  .get(
    verifyJWT,
    checkRole(UserRole.ADMIN, UserRole.MANAGER, UserRole.USER),
    catchAsync(getUserProfile)
  );

//MANAGER APIs

//GET MANAGER Dashboard Details
userRoutes
  .route("/manager/dashboard")
  .get(verifyJWT, checkRole(UserRole.MANAGER), catchAsync(getManagerDashboard));

//ADMIN APIs

//Get All Users
userRoutes
  .route("/admin/users")
  .get(verifyJWT, checkRole(UserRole.ADMIN), catchAsync(getAllUsers));

//Assign Roles
userRoutes
  .route("/admin/assign-role")
  .patch(verifyJWT, checkRole(UserRole.ADMIN), catchAsync(assignUserRole));
