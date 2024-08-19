import express from "express";
import job from "../controllers/job";
import {
  GetAllJobsSchema,
  CreateJobSchema,
  DelJobSchema,
  PatchJobSchema,
} from "../validators/job";
import checkErrors from "../validators/checkErrors";
const router = express.Router();

router.get("/all", checkErrors(GetAllJobsSchema), job.getAllJobs);
router.put("/create", checkErrors(CreateJobSchema), job.createJob);
router.delete("/delete", checkErrors(DelJobSchema), job.delJob);
router.patch("/update", checkErrors(PatchJobSchema), job.patchJob);

export default router;
