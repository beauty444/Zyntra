import app from "./app.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import fs from "fs";
import http from "http";
import https from "https";

dotenv.config();

const IS_LIVE = process.env.IS_LIVE === "true";
const APP_URL = process.env.APP_URL;

let server;

connectDB()
  .then(() => {
    if (IS_LIVE) {
      // 🔒 HTTPS (Production Mode)
      const sslOptions = {
        ca: fs.readFileSync("/var/www/html/ssl/ca_bundle.crt"),
        key: fs.readFileSync("/var/www/html/ssl/private.key"),
        cert: fs.readFileSync("/var/www/html/ssl/certificate.crt"),
      };

      server = https.createServer(sslOptions, app);
      server.listen(process.env.PORT, () => {
        console.log(`✅ HTTPS Server running live at: ${APP_URL}`);
      });
    } else {
      // 🌐 HTTP (Development Mode)
      server = http.createServer(app);
      server.listen(process.env.PORT, () => {
        console.log(`🚀 HTTP Server running locally at: ${APP_URL}`);
      });
    }
  })
  .catch((err) => {
    console.error("❌ Failed to start server due to DB error:", err.message);
    process.exit(1);
  });