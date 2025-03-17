import cors from "cors";
import dotenv from "dotenv";
import express, { Router } from "express";
import applyAuthRoutes from "./modules/auth/auth.router";
import checkAuth from "./middleware/check-auth.middleware";
import applyJobRoutes from "./modules/job/job.router";

dotenv.config();

const PORT = process.env.PORT ?? 3088;
const app = express();
const router = Router();

const jobRouter = Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/api/v1/auth", applyAuthRoutes(router));
app.use("/api/v1/job", checkAuth, applyJobRoutes(jobRouter));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
