import generatePassword from "generate-password";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import { CustomError } from "./CustomError";

const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = process.env;

if (!ACCESS_TOKEN_SECRET_KEY || !REFRESH_TOKEN_SECRET_KEY) {
  throw new CustomError("Missing environments variables", 400);
}

//Generate Random Password
export const passwordGenerator = (): string => {
  return generatePassword.generate({
    length: 12,
    numbers: true,
    symbols: true,
    uppercase: true,
    lowercase: true,
    excludeSimilarCharacters: true,
  });
};

// Hash a password
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

// check password
export const checkPassword = async (password: string, hash: string) => {
  const isMatches = await bcrypt.compare(password, hash);
  if (!isMatches) {
    throw new CustomError("The password you entered is incorrect.", 401);
  }
};

//Generate access token
export const generateAccessToken = (userId: any) => {
  return jwt.sign({ userId }, ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: "1h",
  });
};

//Generate refresh token
export const generateRefreshToken = (userId: any) => {
  return jwt.sign({ userId }, REFRESH_TOKEN_SECRET_KEY, {
    expiresIn: "30d",
  });
};

interface CustomJwtPayload extends JwtPayload {
  userId: string;
}

//Verify refresh token
export const verifyRefreshToken = (token: string) => {
  try {
    const decodedToken = jwt.verify(
      token,
      REFRESH_TOKEN_SECRET_KEY
    ) as CustomJwtPayload;
    return decodedToken;
  } catch (err) {
    throw new CustomError(
      "Session Expired. Please login again to continue.",
      403
    );
  }
};

//Verify access token
export const verifyAccessToken = (token: string) => {
  try {
    const decodedToken = jwt.verify(
      token,
      ACCESS_TOKEN_SECRET_KEY
    ) as CustomJwtPayload;
    return decodedToken;
  } catch (err) {
    throw new CustomError("Session Expired.", 403);
  }
};
