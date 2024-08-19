import { PrismaClient, Prisma } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();
import { CreateJob, GetJobs, UpdateJob, DelJob } from "../interfaces/job";

interface CustomRequest extends Request {
  decoded?: { id: string };
}
const getAllJobs = async (req: CustomRequest, res: Response) => {
  const { user_id }: GetJobs = req.body;

  if (!req.decoded) {
    return res.status(400).json({ status: "error", msg: "invalid request" });
  }

  const userExists = await prisma.user.findUnique({
    where: { id: req.decoded.id },
  });

  if (!userExists) {
    return res.status(401).json({ status: "error", msg: "unauthorised" });
  }

  const jobs = await prisma.job.findMany({
    where: {
      list: {
        userId: user_id,
      },
    },
    select: {
      id: true,
      title: true,
      description: true,
      url: true,
      salary: true,
      location: true,
      attachment: true,
      list: {
        select: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
    },
  });

  res.json(jobs);
  console.log(jobs);
};

const createJob = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      url,
      salary,
      location,
      attachment,
      list_id,
    }: CreateJob = req.body;
    await prisma.job.create({
      data: {
        title,
        description,
        url,
        salary,
        location,
        attachment,
        list: { connect: { id: list_id } },
      },
    });
    res.json("done");
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      res.status(400).json({ status: "error", msg: "error creating job" });
    } else
      res
        .status(500)
        .json({ status: "error", msg: "unknown error creating job" });
  }
};

const delJob = async (req: Request, res: Response) => {
  const { id }: DelJob = req.body;
  try {
    await prisma.job.delete({ where: { id } });
    res.json({ status: "ok", msg: "job deleted" });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      res.status(400).json({ status: "error", msg: "error deleting job" });
    } else
      res
        .status(500)
        .json({ status: "error", msg: "unknown error deleting job" });
  }
};

const patchJob = async (req: Request, res: Response) => {
  const {
    id,
    title,
    description,
    url,
    salary,
    location,
    attachment,
    listId,
  }: UpdateJob = req.body;
  try {
    await prisma.job.update({
      where: { id },
      data: {
        title,
        description,
        url,
        salary,
        location,
        attachment,
        listId,
      },
    });
    res.json({ status: "ok", msg: "job updated" });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      res.status(400).json({ status: "error", msg: "error updating job" });
    } else
      res
        .status(500)
        .json({ status: "error", msg: "unknown error updating job" });
  }
};

export default { getAllJobs, createJob, delJob, patchJob };
