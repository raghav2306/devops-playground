import express from "express";

const app = express();

app.get("/", (req, res, next) => {
  res.status(200).json({ message: "Hello from Express.js" });
});

app.listen(3000, () => {
  console.log("Server is running successfully");
});
