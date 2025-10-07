import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { authGuard } from "./middlewares/guard.middleware.js";
import routes from "./routes/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(cors({ credentials: true, origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static(path.join(__dirname, "public")));
app.use("/api",authGuard, routes);


app.get("/", (req, res) => {
  res.send(`App is running on port: ${process.env.PORT}`);
});

export default app;