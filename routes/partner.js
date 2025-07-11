const express = require("express");
const { createPartnerHandler, getAllPartnerHandler, editPortfolioHandler, addPortfolioHandler, deletePortfolioHandler } = require("../controller/partner");
const { getLeadsHandler, updateInquiryStatusHandler } = require("../controller/inquiry");
const authMiddleware = require("../middleware/authMiddleware");
const partnerMiddleware = require("../middleware/partnerMiddleware");


const router = express.Router();

router.get("/",  getAllPartnerHandler);
router.post("/", authMiddleware, partnerMiddleware, createPartnerHandler);

//portfolio add/edit/delete
router.post("/portfolio/:id", authMiddleware, partnerMiddleware, addPortfolioHandler);
router.put("/portfolio/:id/:index", authMiddleware, partnerMiddleware, editPortfolioHandler);
router.delete("/portfolio/:id/:index", authMiddleware, partnerMiddleware, deletePortfolioHandler);

//leads management
router.get("/leads", authMiddleware, partnerMiddleware, getLeadsHandler);
router.put("/leads/:id", authMiddleware, partnerMiddleware, updateInquiryStatusHandler)

module.exports = router;