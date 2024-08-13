import express from "express";
const router = express.Router();
import register from "../controllers/auth";

router.put("/register", register);

export default router;
