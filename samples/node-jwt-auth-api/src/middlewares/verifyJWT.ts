import { Request, Response, NextFunction } from "express";
import { CustomError, verifyAccessToken } from "../utils";
import { User } from "../models";

declare module "express-serve-static-core" {
  interface Request {
    user?: any;
  }
}

export const verifyJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorizationHeader = req.headers?.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return next(new CustomError("You are not authenticated.", 401));
  }

  const token = authorizationHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = verifyAccessToken(token);
  } catch (err) {
    return next(err);
  }

  let user = await User.findById(decodedToken.userId).select(
    "-password -updatedAt"
  );

  if (!user) {
    return next(new CustomError("You are not authenticated.", 401));
  }

  req.user = user;
  next();
};
