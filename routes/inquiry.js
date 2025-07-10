const express = require("express");
const { createInquiryHandler } = require("../controller/inquiry");

const router = express.Router();

router.post("/", createInquiryHandler);

module.exports = router;