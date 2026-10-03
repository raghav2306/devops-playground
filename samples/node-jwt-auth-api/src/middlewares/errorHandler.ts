import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils";

// Error-handling middleware
export const serverError = (
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

export const catchAsync =
  (
    handler: (req: Request, res: Response, next: NextFunction) => Promise<any>
  ) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
