const express = require("express");
const router = express.Router();

const protect = require("../middlewares/auth.middleware");
const admin = require("../middlewares/admin.middleware");

const {
  createPackage,
  getPackagesByPlatform,
  getAllPackages,
  updatePackage,
  deletePackage,
} = require("../controllers/package/package.controller");

// User Flow: Fetch package cards of a specific platform (e.g. Instagram or Facebook)
router.get("/platform/:platformId", protect, getPackagesByPlatform);

// Admin Flow: Fetch all packages
router.get("/", protect, admin, getAllPackages);

// Admin Flow: Create package card under any platform
router.post("/", protect, admin, createPackage);

// Admin Flow: Update package card
router.put("/:id", protect, admin, updatePackage);

// Admin Flow: Delete package card & its leads
router.delete("/:id", protect, admin, deletePackage);

module.exports = router;