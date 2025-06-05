import { Job } from "../models/job.model.js";

// admin post krega job
export const postJob = async (req, res) => {
  try {
    console.log("=== Post Job Request ===");
    console.log("Request body:", req.body);
    console.log("Request headers:", req.headers);

    const {
      title,
      description,
      requirements,
      location,
      salary,
      experience,
      jobType,
      position,
      companyId,
    } = req.body;
    const userId = req.id;

    console.log("Extracted data:", {
      title,
      description,
      requirements,
      location,
      salary,
      experience,
      jobType,
      position,
      companyId,
      userId,
    });

    if (
      !title ||
      !description ||
      !location ||
      !salary ||
      !experience ||
      !jobType ||
      !position ||
      !companyId
    ) {
      console.log("Missing required fields");
      return res.status(400).json({
        message: "All fields are required",
        success: false,
        missingFields: {
          title: !title,
          description: !description,
          location: !location,
          salary: !salary,
          experience: !experience,
          jobType: !jobType,
          position: !position,
          companyId: !companyId,
        },
      });
    }

    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      location,
      salary: Number(salary),
      experienceLevel: Number(experience),
      jobType,
      position,
      company: companyId,
      created_by: userId,
    });
    return res
      .status(200)
      .json({ message: "Job posted successfully", success: true, job });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query)
      .populate({ path: "company" })
      .sort({ createdAt: -1 });
    if (!jobs) {
      return res.status(404).json({ message: "No jobs found", success: false });
    }
    return res
      .status(200)
      .json({ message: "Jobs found successfully", success: true, jobs });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};
// students
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({ path: "company" });
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }
    return res
      .status(200)
      .json({ message: "Job found successfully", success: true, job });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

// admin kitne job create kra abhi tk

export const getAdminJobs = async (req, res) => {
  try {
    const userId = req.id;
    const jobs = await Job.find({ created_by: userId });
    if (!jobs) {
      return res.status(404).json({ message: "No jobs found", success: false });
    }
    return res
      .status(200)
      .json({ message: "Jobs found successfully", success: true, jobs });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};
