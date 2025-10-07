import app from "./app.js";
import { PORT } from "./constants.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();


connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to start server due to DB error:", err.message);
    process.exit(1);
  });