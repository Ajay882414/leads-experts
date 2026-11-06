const express = require("express");
const router = express.Router();

const protect = require("../middlewares/auth.middleware");
const admin = require("../middlewares/admin.middleware");
const hubUpload = require("../middlewares/hubUpload.middleware");

const {
  getHubFeed,
  getAdminPosts,
  createHubPost,
  updateHubPost,
  deleteHubPost,
} = require("../controllers/secretGrowthHub/secretGrowthHub.controller");

// User Feed (checks 1st order)
router.get("/", protect, getHubFeed);

// Admin Routes
router.get("/admin", protect, admin, getAdminPosts);
router.post("/admin", protect, admin, hubUpload.single("mediaFile"), createHubPost);
router.put("/admin/:id", protect, admin, hubUpload.single("mediaFile"), updateHubPost);
router.delete("/admin/:id", protect, admin, deleteHubPost);

module.exports = router;