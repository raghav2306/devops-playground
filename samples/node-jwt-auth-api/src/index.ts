import app from "./app";
import { connectDB } from "./config";

const PORT = process.env.PORT || 8080;

// Initialize database and start server
const main = async () => {
  try {
    // await connectDB();

    app.listen(PORT, () => {
      console.log("Server is listening on port " + PORT);
    });
  } catch (err) {
    console.error("Unable to connect to the database:", err);
    throw err;
  }
};

main().catch((err) => {
  process.exit(1);
});
