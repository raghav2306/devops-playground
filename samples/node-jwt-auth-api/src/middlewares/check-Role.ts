import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils";
import { UserRole } from "../enums/UserRole";

interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: UserRole;
  };
}

export const checkRole =
  (...allowedRoles: UserRole[]) =>
  (req: AuthRequest, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      return next(new CustomError("Unauthorized", 401));
    }

    if (!allowedRoles.includes(user.role)) {
      return next(new CustomError("You are not authorized.", 403));
    }

    next();
  };
