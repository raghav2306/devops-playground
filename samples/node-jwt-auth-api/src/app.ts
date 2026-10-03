import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import "dotenv/config";
import { authRoutes, userRoutes } from "./routes";
import { serverError } from "./middlewares";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use(serverError);

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Server is running successfully" });
});

export default app;
