const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  jobLocation: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    required: true,
    enum: ["Full-time", "Part-time", "Contract", "Internship"], 
  },
  jobSkill: {
    type: [String], 
    required: true,
  },
});

const jobModel = mongoose.model("Job", jobSchema);

module.exports = jobModel;
