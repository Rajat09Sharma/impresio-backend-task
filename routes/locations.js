const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const { createLocationHandler, getLocationsHandler, updateLocationHandler, deleteLocationHandler } = require("../controller/location");


const router = express.Router();

//location CRUD
router.post("/", authMiddleware, adminMiddleware, createLocationHandler);
router.get("/", authMiddleware, adminMiddleware, getLocationsHandler);
router.put("/:id", authMiddleware, adminMiddleware, updateLocationHandler);
router.delete("/:id", authMiddleware, adminMiddleware, deleteLocationHandler);


module.exports = router;