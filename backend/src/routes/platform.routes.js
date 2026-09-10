const express = require("express");

const router = express.Router();

const protect = require("../middlewares/auth.middleware");
const admin = require("../middlewares/admin.middleware");

const validatePlatform = require("../validators/platformValidator");

const createPlatform = require("../controllers/platform/createPlatform.controller");
const getPlatforms = require("../controllers/platform/getPlatforms.controller");
const getPlatform = require("../controllers/platform/getPlatform.controller");
const updatePlatform = require("../controllers/platform/updatePlatform.controller");
const deletePlatform = require("../controllers/platform/deletePlatform.controller");
const getPlatformPrice = require("../controllers/platform/getPlatformPrice.controller");

// ==========================
// Get All Platforms
// ==========================

router.get("/", getPlatforms);

// ==========================
// Get Platform Price
// IMPORTANT: before /:id
// ==========================

router.get("/:id/price", getPlatformPrice);

// ==========================
// Get Single Platform
// ==========================

router.get("/:id", getPlatform);

// ==========================
// Create Platform - ADMIN
// ==========================

router.post(
  "/",
  protect,
  admin,
  validatePlatform,
  createPlatform
);

// ==========================
// Update Platform - ADMIN
// ==========================

router.put(
  "/:id",
  protect,
  admin,
  validatePlatform,
  updatePlatform
);

// ==========================
// Delete Platform - ADMIN
// ==========================

router.delete(
  "/:id",
  protect,
  admin,
  deletePlatform
);

module.exports = router;