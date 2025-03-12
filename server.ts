import cors from "cors";
import dotenv from "dotenv";
import express, { Router } from "express";
import applyAuthRoutes from "./modules/auth/auth.router";

dotenv.config();

const PORT = process.env.PORT ?? 3088;
const app = express();
const router = Router();

// console.log('process : ', process.env.DATABASE_URL, process.env.PORT )

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

// general routes

app.use('/api/v1/auth', applyAuthRoutes(router));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
