import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const register = async (req: Request, res: Response) => {
  // try {
  const { email, name, password } = req.body;
  const existingUser = await prisma.user.findFirst({ where: { email } });

  // const user = await prisma.user.findFirst({
  //   where: { email: req.body.email },
  // });

  if (existingUser) {
    return res
      .status(400)
      .json({ status: "error", message: "email already in use" });
  }

  const hash = await bcrypt.hash(password, 12);
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      hash,
    },
  });
  res.json(newUser);
  // } catch (error) {
  //   console.error(error.message);
  // }
};

export default register;
