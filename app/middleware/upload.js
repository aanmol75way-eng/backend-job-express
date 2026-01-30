const multer = require("multer");
const path = require("path");

// Destination and filename configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "app/uploads/"); // uploads folder
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  }
});

// File filter (optional: only pdf/doc for resumes)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /pdf|doc|docx/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.test(ext)) cb(null, true);
  else cb(new Error("Only PDF/DOC files are allowed"));
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
