import { PrismaClient, Prisma } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();
import { CreateJob, UpdateJob, DelJob } from "../interfaces/job";

interface CustomRequest extends Request {
  decoded?: { id: string };
}
const getAllJobs = async (req: CustomRequest, res: Response) => {
  if (!req.decoded) {
    return res.status(400).json({ status: "error", msg: "invalid request" });
  }

  try {
    const jobs = await prisma.job.findMany({
      where: {
        list: {
          userId: req.decoded.id,
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
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      res.status(400).json({ status: "error", msg: "error getting jobs" });
    } else console.error(error, "unknown get all jobs error");
    res.status(500).json({ status: "error", msg: "Internal server error" });
  }
};

const createJob = async (req: CustomRequest, res: Response) => {
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

    const list = await prisma.list.findUnique({
      where: { id: list_id },
      include: { user: true },
    });

    if (!list) {
      return res.status(400).json({ status: "error", msg: "can't find list" });
    }

    if (!req.decoded) {
      return res.status(400).json({ status: "error", msg: "invalid request" });
    }
    if (list.user.id !== req.decoded.id) {
      return res
        .status(401)
        .json({ status: "error", msg: "unauthorised to create job" });
    }

    console.log(list);

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
    res.json({ status: "ok", msg: "job created" });
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

const delJob = async (req: CustomRequest, res: Response) => {
  const { id }: DelJob = req.body;

  const job = await prisma.job.findUnique({
    where: { id },
    include: { list: { include: { user: true } } },
  });
  if (!job) {
    return res.status(400).json({ status: "error", msg: "can't find job" });
  }

  if (!req.decoded) {
    return res.status(400).json({ status: "error", msg: "invalid request" });
  }

  if (job.list.user.id !== req.decoded.id) {
    return res
      .status(401)
      .json({ status: "error", msg: "unauthorised to delete job" });
  }

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

const patchJob = async (req: CustomRequest, res: Response) => {
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

  const job = await prisma.job.findUnique({
    where: { id },
    include: { list: { include: { user: true } } },
  });
  if (!job) {
    return res.status(400).json({ status: "error", msg: "can't find job" });
  }

  if (!req.decoded) {
    return res.status(400).json({ status: "error", msg: "invalid request" });
  }

  if (job.list.user.id !== req.decoded.id) {
    return res
      .status(401)
      .json({ status: "error", msg: "unauthorised to amend job" });
  }

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
