const jobModel = require("../../models/jobModels");

// ================= CREATE JOB =================
let createJob = async (req, res) => {
  try {
    const { jobLocation, jobType, jobSkill } = req.body;

    if (!jobLocation || !jobType || !jobSkill) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const job = await jobModel.create({
      jobLocation,
      jobType,
      jobSkill,
    });

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      data: job,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while creating job",
      error: error.message,
    });
  }
};

// ================= UPDATE JOB =================
let updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const { jobLocation, jobType, jobSkill } = req.body;

    const updatedJob = await jobModel.findByIdAndUpdate(
      id,
      {
        ...(jobLocation && { jobLocation }),
        ...(jobType && { jobType }),
        ...(jobSkill && { jobSkill }),
      },
      { new: true, runValidators: true }
    );

    if (!updatedJob) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Job updated successfully",
      data: updatedJob,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while updating job",
      error: error.message,
    });
  }
};

// ================= GET SINGLE JOB =================
let getSingleJob = async (req, res) => {
  try {
    const job = await jobModel.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      data: job,
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid Job ID",
    });
  }
};

// ================= DELETE JOB =================
let deleteJob = async (req, res) => {
  try {
    const deletedJob = await jobModel.findByIdAndDelete(req.params.id);

    if (!deletedJob) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid Job ID",
    });
  }
};

// ================= GET ALL JOBS =================
let getAllJobs = async (req, res) => {
  try {
    const { jobLocation, jobType, jobSkill } = req.query;

    let filter = {};

    if (jobLocation) filter.jobLocation = jobLocation;
    if (jobType) filter.jobType = jobType;
    if (jobSkill) filter.jobSkill = { $in: [jobSkill] };

    const jobs = await jobModel.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while fetching jobs",
      error: error.message,
    });
  }
};

module.exports = {
  createJob,
  updateJob,
  getSingleJob,
  deleteJob,
  getAllJobs,
};
