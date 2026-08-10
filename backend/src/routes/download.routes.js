const express = require("express");

const router = express.Router();

const protect = require("../middlewares/auth.middleware");
const admin = require("../middlewares/admin.middleware");

const createDownload = require("../controllers/download/createDownload.controller");
const getDownloads = require("../controllers/download/getDownloads.controller");
const getDownload = require("../controllers/download/getDownload.controller");
const getMyDownloads = require("../controllers/download/getMyDownloads.controller");
const getDownloadStats = require("../controllers/download/getDownloadStats.controller");
const deleteDownload = require("../controllers/download/deleteDownload.controller");
const downloadOrderLead = require("../controllers/download/downloadOrderLead.controller");

// =====================
// Download Stats
// =====================

router.get(
  "/stats",
  protect,
  admin,
  getDownloadStats
);

// =====================
// My Downloads
// =====================

router.get(
  "/my-downloads",
  protect,
  getMyDownloads
);

// =====================
// Download Lead File
// =====================

router.get(
  "/download/:orderId",
  protect,
  downloadOrderLead
);

// =====================
// Get All Downloads
// =====================

router.get(
  "/",
  protect,
  admin,
  getDownloads
);

// =====================
// Get Single Download
// =====================

router.get(
  "/:id",
  protect,
  admin,
  getDownload
);

// =====================
// Create Download
// =====================

router.post(
  "/",
  protect,
  admin,
  createDownload
);

// =====================
// Delete Download
// =====================

router.delete(
  "/:id",
  protect,
  admin,
  deleteDownload
);

module.exports = router;