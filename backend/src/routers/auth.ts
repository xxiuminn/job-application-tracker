import express from "express";
import auth from "../controllers/auth";
const router = express.Router();

router.put("/register", auth.register);
router.post("/login", auth.login);

export default router;
