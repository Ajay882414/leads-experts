const express = require("express");

const router = express.Router();

const protect = require("../middlewares/auth.middleware");
const admin = require("../middlewares/admin.middleware");

// ==========================================
// CONTROLLERS
// ==========================================

const createDownload = require(
  "../controllers/download/createDownload.controller"
);

const getDownloads = require(
  "../controllers/download/getDownloads.controller"
);

const getDownload = require(
  "../controllers/download/getDownload.controller"
);

const getMyDownloads = require(
  "../controllers/download/getMyDownloads.controller"
);

const getDownloadStats = require(
  "../controllers/download/getDownloadStats.controller"
);

const deleteDownload = require(
  "../controllers/download/deleteDownload.controller"
);

const downloadOrderLead = require(
  "../controllers/download/downloadOrderLead.controller"
);

// ==========================================
// ADMIN - DOWNLOAD STATS
// ==========================================

router.get(
  "/stats",
  protect,
  admin,
  getDownloadStats
);

// ==========================================
// USER - MY DOWNLOAD HISTORY
// ==========================================

router.get(
  "/my-downloads",
  protect,
  getMyDownloads
);

// ==========================================
// USER - DOWNLOAD ORDER CSV
// IMPORTANT:
// Must be before "/:id"
// ==========================================

router.get(
  "/download/:orderId",
  protect,
  downloadOrderLead
);

// ==========================================
// ADMIN - GET ALL DOWNLOADS
// ==========================================

router.get(
  "/",
  protect,
  admin,
  getDownloads
);

// ==========================================
// ADMIN - GET SINGLE DOWNLOAD
// ==========================================

router.get(
  "/:id",
  protect,
  admin,
  getDownload
);

// ==========================================
// ADMIN - CREATE DOWNLOAD RECORD
// ==========================================

router.post(
  "/",
  protect,
  admin,
  createDownload
);

// ==========================================
// ADMIN - DELETE DOWNLOAD
// ==========================================

router.delete(
  "/:id",
  protect,
  admin,
  deleteDownload
);

module.exports = router;