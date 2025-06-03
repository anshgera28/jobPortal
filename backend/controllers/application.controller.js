import mongoose from "mongoose";
import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;  // Changed back to id to match route

        if (!jobId) {
            return res.status(400).json({
                message: "Job ID is required",
                success: false
            });
        }

        // Validate jobId format
        if (!mongoose.Types.ObjectId.isValid(jobId)) {
            return res.status(400).json({
                message: "Invalid job ID format",
                success: false
            });
        }

        // Check if user has already applied for this job
        const existingApplication = await Application.findOne({
            job: jobId,
            applicant: userId
        });

        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this job",
                success: false
            });
        }

        // Check if the job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        // Create new application
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId
        });

        // Add application to job's applications array
        job.applications.push(newApplication._id);
        await job.save();

        return res.status(200).json({
            message: "Application submitted successfully",
            success: true,
            application: newApplication
        });
    } catch (error) {
        console.error("Apply job error:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message
        });
    }
};

export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;

        const applications = await Application.find({ applicant: userId })
            .sort({ createdAt: -1 })
            .populate({
                path: "job",
                populate: {
                    path: "company",
                    select: "name location website"
                }
            });

        if (!applications || applications.length === 0) {
            return res.status(404).json({
                message: "No applications found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Applications found successfully",
            success: true,
            applications
        });
    } catch (error) {
        console.error("Get applied jobs error:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message
        });
    }
};

export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;  // Changed back to id to match route

        if (!mongoose.Types.ObjectId.isValid(jobId)) {
            return res.status(400).json({
                message: "Invalid job ID format",
                success: false
            });
        }

        const job = await Job.findById(jobId)
            .populate({
                path: "applications",
                populate: {
                    path: "applicant",
                    select: "fullname email phoneNumber profile"
                }
            })
            .sort({ "applications.createdAt": -1 });

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Applicants found successfully",
            success: true,
            job
        });
    } catch (error) {
        console.error("Get applicants error:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message
        });
    }
};

export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;  // Changed back to id to match route

        if (!mongoose.Types.ObjectId.isValid(applicationId)) {
            return res.status(400).json({
                message: "Invalid application ID format",
                success: false
            });
        }

        if (!status || !["pending", "accepted", "rejected"].includes(status.toLowerCase())) {
            return res.status(400).json({
                message: "Valid status is required (pending, accepted, or rejected)",
                success: false
            });
        }

        const application = await Application.findById(applicationId);
        if (!application) {
            return res.status(404).json({
                message: "Application not found",
                success: false
            });
        }

        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message: "Application status updated successfully",
            success: true,
            application
        });
    } catch (error) {
        console.error("Update status error:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message
        });
    }
};
