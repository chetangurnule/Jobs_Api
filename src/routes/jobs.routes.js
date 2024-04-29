import { Router } from "express";
import {
  createJob,
  getAllJobs,
  getJob,
  updateJob,
  deleteJob,
} from "../controllers/jobs.controllers.js";
const router = Router();

router.route("/").post(createJob).get(getAllJobs);
router.route("/:id").get(getJob).patch(updateJob).delete(deleteJob);

export default router;
