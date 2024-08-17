import express, { Express } from "express";
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import auth from "./src/routers/auth";
import list from "./src/routers/list";
import job from "./src/routers/job";

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
app.use("/list", list);
app.use("/job", job);

const PORT = process.env.port || 8000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
