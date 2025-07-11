const express = require("express");
const { createInquiryHandler } = require("../controller/inquiry");
const authMiddleware = require("../middleware/authMiddleware");
const clientMiddleware = require("../middleware/clientMiddleware");

const router = express.Router();

router.post("/", authMiddleware, clientMiddleware, createInquiryHandler);

module.exports = router;