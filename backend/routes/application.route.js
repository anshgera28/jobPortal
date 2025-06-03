import express from "express";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/application.controller.js";
import { isAuthenticated } from "../middlewears/isAuthenticated.js";

const router = express.Router();

// Keep original route names but with improved error handling
router.route("/get").get(isAuthenticated, getAppliedJobs);  // Original route for getting applications
router.route("/apply/:id").post(isAuthenticated, applyJob);  // Changed to POST for applying
router.route("/:id/applicants").get(isAuthenticated, getApplicants);
router.route("/status/:id/update").put(isAuthenticated, updateStatus);

export default router;
