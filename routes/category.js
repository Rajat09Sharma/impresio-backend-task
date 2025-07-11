const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const { createCategoryHandler, getCategoriesHandler, updateCategoryHandler, deleteCategoryHandler } = require("../controller/category");

const router = express.Router();
//category CRUD
router.post("/", authMiddleware, adminMiddleware, createCategoryHandler);
router.get("/", authMiddleware, adminMiddleware, getCategoriesHandler);
router.put("/:id", authMiddleware, adminMiddleware, updateCategoryHandler);
router.delete("/:id", authMiddleware, adminMiddleware, deleteCategoryHandler);



module.exports = router;