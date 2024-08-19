import express from "express";
import job from "../controllers/job";
import {
  CreateJobSchema,
  DelJobSchema,
  PatchJobSchema,
} from "../validators/job";
import checkErrors from "../validators/checkErrors";
import auth from "../middleware/auth";
const router = express.Router();

router.get("/all", auth, job.getAllJobs);
router.put("/create", auth, checkErrors(CreateJobSchema), job.createJob);
router.delete("/delete", auth, checkErrors(DelJobSchema), job.delJob);
router.patch("/update", auth, checkErrors(PatchJobSchema), job.patchJob);

export default router;
