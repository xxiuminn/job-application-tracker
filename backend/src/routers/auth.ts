import express from "express";
import auth from "../controllers/auth";
import checkErrors from "../validators/checkErrors";
import { RegistrationSchema, LoginSchema } from "../validators/auth";
const router = express.Router();

router.put("/register", checkErrors(RegistrationSchema), auth.register);
router.post("/login", checkErrors(LoginSchema), auth.login);

export default router;
