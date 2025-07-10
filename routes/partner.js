const express = require("express");
const { createPartnerHandler, getAllPartnerHandler, editPortfolioHandler, addPortfolioHandler, deletePortfolioHandler } = require("../controller/partner");

const router = express.Router();

router.get("/", getAllPartnerHandler);
router.post("/", createPartnerHandler);
router.post("/portfolio/:id", addPortfolioHandler);
router.put("/portfolio/:id/:index", editPortfolioHandler);
router.delete("/portfolio/:id/:index", deletePortfolioHandler);

module.exports = router;