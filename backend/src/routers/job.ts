import express from "express";
import job from "../controllers/job";
const router = express.Router();

router.get("/all", job.getAllJobs);
router.put("/create", job.createJob);
router.delete("/delete", job.delJob);
router.patch("/update", job.patchJob);

export default router;
