const express = require("express");
const router = express.Router();
const { createApplication } = require("../../controllers/web/applicationFormControllers");
const upload = require("../../middleware/upload");

// POST /web/application/create/:jobId
router.post("/create/:jobId", upload.single("resume"), createApplication);

module.exports = router;
