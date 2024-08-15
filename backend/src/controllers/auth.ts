import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

type Body = {
  email: string;
  name: string;
  password: string;
};

const register = async (req: Request, res: Response) => {
  const { email, name, password }: Body = req.body;
  const existingUser = await prisma.user.findFirst({ where: { email } });

  if (existingUser) {
    return res
      .status(400)
      .json({ status: "error", message: "email already in use" });
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
    res.json(newUser);
  } catch (error) {
    res
      .status(400)
      .json({ status: "error", message: (error as Error).message });
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password }: Body = req.body;
  const user = await prisma.user.findFirst({ where: { email } });

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

  const claims = {
    id: user.id,
  };

  const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
    expiresIn: "120m",
    jwtid: uuidv4(),
  });

  console.log(user);
  res.json({ access });
};

export { login, register };
