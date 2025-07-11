const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const { getKpisHandler } = require("../controller/admin");
const { getPendingStatusPartnersHandler, updatePartnerStatusHandler } = require("../controller/partner");
const { getReviewsHandler, updateReviewHandler, deleteReviewHandler } = require("../controller/review.js");
const { createCategoryHandler, getCategoriesHandler, updateCategoryHandler, deleteCategoryHandler } = require("../controller/category");
const { createLocationHandler, getLocationsHandler, updateLocationHandler, deleteLocationHandler } = require("../controller/location");



const router = express.Router();

router.get("/", authMiddleware, adminMiddleware, getKpisHandler);

//view pending partner status
router.get("/verification", authMiddleware, adminMiddleware, getPendingStatusPartnersHandler);

//update pending partner status
router.put("/verify/:id", authMiddleware, adminMiddleware, updatePartnerStatusHandler);

//review view/edit/delete
router.get("/reviews", authMiddleware, adminMiddleware, getReviewsHandler);
router.put("/review/:id", authMiddleware, adminMiddleware, updateReviewHandler);
router.delete("/review/:id", authMiddleware, adminMiddleware, deleteReviewHandler);

//category CRUD
router.post("/category", authMiddleware, adminMiddleware, createCategoryHandler);
router.get("/category", authMiddleware, adminMiddleware, getCategoriesHandler);
router.put("/category/:id", authMiddleware, adminMiddleware, updateCategoryHandler);
router.delete("/category/:id", authMiddleware, adminMiddleware, deleteCategoryHandler);

//location CRUD
router.post("/location", authMiddleware, adminMiddleware, createLocationHandler);
router.get("/location", authMiddleware, adminMiddleware, getLocationsHandler);
router.put("/location/:id", authMiddleware, adminMiddleware, updateLocationHandler);
router.delete("/location/:id", authMiddleware, adminMiddleware, deleteLocationHandler);


module.exports = router;