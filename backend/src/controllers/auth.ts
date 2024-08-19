import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { Login, Register } from "../interfaces/auth";

const prisma = new PrismaClient();

const register = async (req: Request, res: Response) => {
  const { email, name, password }: Register = req.body;
  const existingUser = await prisma.user.findFirst({ where: { email } });

  if (existingUser) {
    return res
      .status(400)
      .json({ status: "error", msg: "email already in use" });
  }

  try {
    const hash = await bcrypt.hash(password, 12);
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        hash,
      },
    });
    res.json({ status: "ok", msg: "user created" });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      res.status(400).json({ status: "error", msg: "invalid registration" });
    } else console.error(error, "unknown register error");
    res.status(500).json({ status: "error", msg: "Internal server error" });
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password }: Login = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return res
      .status(401)
      .json({ status: "error", message: "invalid credentials" });
  }

  const verifyPassword = await bcrypt.compare(password, user.hash);
  if (!verifyPassword) {
    return res
      .status(401)
      .json({ status: "error", message: "invalid credentials" });
  }
  try {
    const claims = {
      id: user.id,
    };

    const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "120m",
      jwtid: uuidv4(),
    });

    console.log(user);
    res.json({ access });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      res.status(500).json({ status: "error", msg: "login failed" });
    } else console.error(error, "unknown login error");
    res.status(500).json({ status: "error", msg: "Internal server error" });
  }
};

export default { login, register };
