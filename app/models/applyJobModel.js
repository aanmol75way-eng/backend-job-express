const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    userResume: {
      type: String,
      required: true,
    },
    userStatus: {
      type: String,
      enum: ["Applied", "Shortlisted", "Rejected", "Hired"],
      default: "Applied",
    },
    role:{
      type:String,
    }
  },
  { timestamps: true }
);
let applicationModel =mongoose.model("application", applicationSchema);
module.exports ={applicationModel}
