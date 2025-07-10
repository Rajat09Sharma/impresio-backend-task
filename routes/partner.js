const express = require("express");
const { createPartnerHandler, getAllPartnerHandler, editPortfolioHandler, addPortfolioHandler, deletePortfolioHandler } = require("../controller/partner");
const { getLeadsHandler, updateInquiryStatusHandler } = require("../controller/inquiry");


const router = express.Router();

router.get("/", getAllPartnerHandler);
router.post("/", createPartnerHandler);
router.post("/portfolio/:id", addPortfolioHandler);
router.put("/portfolio/:id/:index", editPortfolioHandler);
router.delete("/portfolio/:id/:index", deletePortfolioHandler);

router.get("/leads", getLeadsHandler);
router.put("/leads/:id", updateInquiryStatusHandler)

module.exports = router;