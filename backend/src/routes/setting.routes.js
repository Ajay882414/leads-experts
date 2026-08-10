const express = require("express");

const router = express.Router();

const protect =
  require("../middlewares/auth.middleware");

const admin =
  require("../middlewares/admin.middleware");

const getSettings =
  require("../controllers/settings/getSettings.controller");

const updateSettings =
  require("../controllers/settings/updateSettings.controller");

// Get Settings
router.get(
  "/",
  protect,
  admin,
  getSettings
);

// Update Settings
router.put(
  "/",
  protect,
  admin,
  updateSettings
);

module.exports = router;