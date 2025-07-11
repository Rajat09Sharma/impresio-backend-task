const express = require("express");
const { createReviewHandler, getReviewsHandler, getReviewByIdHandler } = require("../controller/review.js");

const router = express.Router();

router.post("/", createReviewHandler);
router.get("/", getReviewsHandler);
router.get("/:id", getReviewByIdHandler);

module.exports = router;