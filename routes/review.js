const express = require("express");
const { createReviewHandler, getReviewsHandler, getReviewByIdHandler} = require("../controller/review.js");
const authMiddleware = require("../middleware/authMiddleware.js");
const clientMiddleware = require("../middleware/clientMiddleware.js");

const router = express.Router();

router.post("/:id", authMiddleware, clientMiddleware, createReviewHandler);
router.get("/:id", authMiddleware, getReviewByIdHandler);

router.get("/", getReviewsHandler);


module.exports = router;