import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { CreateList, UpdateList, DelList } from "../interfaces/list";

const prisma = new PrismaClient();

interface CustomRequest extends Request {
  decoded?: { id: string };
}

const getAllList = async (req: CustomRequest, res: Response) => {
  if (!req.decoded) {
    return res.status(401).json({ status: "error", msg: "invalid request" });
  }
  try {
    const lists = await prisma.list.findMany({
      where: { userId: req.decoded.id },
    });
    res.json(lists);
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

const createList = async (req: CustomRequest, res: Response) => {
  const { title }: CreateList = req.body;
  if (!req.decoded) {
    return res.status(401).json({ status: "error", msg: "invalid request" });
  }
  try {
    await prisma.list.create({
      data: {
        title,
        userId: req.decoded.id,
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

const delList = async (req: CustomRequest, res: Response) => {
  // ensure list is empty to allow delete.
  const { id }: DelList = req.body;
  const list = await prisma.list.findUnique({ where: { id } });
  if (!list) {
    return res.status(400).json({ status: "error", msg: "can't find list" });
  }

  if (!req.decoded) {
    return res.status(400).json({ status: "error", msg: "invalid request" });
  }

  if (list.userId !== req.decoded.id) {
    return res
      .status(401)
      .json({ status: "error", msg: "unauthorised to delete list" });
  }

  const job = await prisma.list.findUnique({
    where: { id },
    select: { job: true },
  });

  if (!job?.job.length) {
    return res.status(400).json({
      status: "error",
      msg: "there are jobs in the list, can't delete",
    });
  }

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

const patchList = async (req: CustomRequest, res: Response) => {
  const { id, title }: UpdateList = req.body;

  const list = await prisma.list.findUnique({ where: { id } });
  if (!list) {
    return res.status(400).json({ status: "error", msg: "can't find list" });
  }

  if (!req.decoded) {
    return res.status(400).json({ status: "error", msg: "invalid request" });
  }

  if (list.userId !== req.decoded.id) {
    return res
      .status(401)
      .json({ status: "error", msg: "unauthorised to amend list" });
  }

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
