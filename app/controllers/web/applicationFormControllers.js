const { applicationModel } = require("../../models/applyJobModel");

const createApplication = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { userName, userEmail } = req.body;

    if (!jobId || !userName || !userEmail || !req.file) {
      return res.status(400).json({ success: false, message: "All fields including resume are required" });
    }

    const alreadyApplied = await applicationModel.findOne({ jobId, userEmail });
    if (alreadyApplied) {
      return res.status(409).json({ success: false, message: "Already applied for this job" });
    }

    const application = await applicationModel.create({
      jobId,
      userName,
      userEmail,
      userResume: req.file.path
    });

    res.status(201).json({ success: true, message: "Application submitted successfully", data: application });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

module.exports = { createApplication };
