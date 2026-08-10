const express = require("express");

const router = express.Router();

const protect =
  require("../middlewares/auth.middleware");

const admin =
  require("../middlewares/admin.middleware");

const dashboardReport =
  require("../controllers/report/dashboardReport.controller");

const salesReport =
  require("../controllers/report/salesReport.controller");

const platformReport =
  require("../controllers/report/platformReport.controller");

const userReport =
  require("../controllers/report/userReport.controller");

const orderReport =
  require("../controllers/report/orderReport.controller");

const downloadReport =
  require("../controllers/report/downloadReport.controller");

// Dashboard Report
router.get(
  "/dashboard",
  protect,
  admin,
  dashboardReport
);

// Sales Report
router.get(
  "/sales",
  protect,
  admin,
  salesReport
);

// Platform Report
router.get(
  "/platforms",
  protect,
  admin,
  platformReport
);

// User Report
router.get(
  "/users",
  protect,
  admin,
  userReport
);

// Order Report
router.get(
  "/orders",
  protect,
  admin,
  orderReport
);

// Download Report
router.get(
  "/downloads",
  protect,
  admin,
  downloadReport
);

module.exports = router;