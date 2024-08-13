import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import auth from "./src/routers/auth";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
});

const app: Express = express();

app.use(cors());
app.use(helmet());
app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", auth);

const PORT = process.env.port || 8000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
