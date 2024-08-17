import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { CreateList, UpdateList, DelList, GetList } from "../interfaces/list";

const prisma = new PrismaClient();

const getAllList = async (req: Request, res: Response) => {
  // need to make sure that only the user get all his/her own list
  const { user_id }: GetList = req.body;
  try {
    const lists = await prisma.list.findMany({
      where: { userId: user_id },
    });
    res.json(lists);
    console.log(lists);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(400).json({ status: "error", msg: "error getting lists" });
    } else {
      console.error(error, "unknown get all list error");
      res.status(500).json({ status: "error", msg: "Internal server error" });
    }
  }
};

const createList = async (req: Request, res: Response) => {
  // need to make sure that only the user can create his/her own list

  const { title, user_id }: CreateList = req.body;
  try {
    await prisma.list.create({
      data: {
        title,
        userId: user_id,
      },
    });
    res.json({ status: "ok", msg: "list created" });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      res.status(400).json({ status: "error", msg: "error creating list" });
    } else {
      console.error(error, "unknown create list error");
      res.status(500).json({ status: "error", msg: "Internal server error" });
    }
  }
};

const delList = async (req: Request, res: Response) => {
  // need to make sure that only the user can delete his/her own list
  const { id }: DelList = req.body;
  try {
    await prisma.list.delete({ where: { id } });
    res.json({ status: "ok", msg: "list deleted" });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      res.status(400).json({ status: "error", msg: "error deleting list" });
    } else {
      console.error(error, "unknown delete list error");
      res.status(500).json({ status: "error", msg: "Internal server error" });
    }
  }
};

const patchList = async (req: Request, res: Response) => {
  const { id, title }: UpdateList = req.body;
  try {
    await prisma.list.update({
      where: { id },
      data: {
        title,
      },
    });
    res.json({ status: "ok", msg: "list updated" });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      res.status(400).json({ status: "error", msg: "error updating list" });
    } else {
      console.error(error, "unknown update list error");
      res.status(500).json({ status: "error", msg: "Internal server error" });
    }
  }
};

export default { getAllList, createList, delList, patchList };
