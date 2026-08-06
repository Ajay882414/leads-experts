const express = require("express");

const router = express.Router();

const protect = require("../middlewares/auth.middleware");
const admin = require("../middlewares/admin.middleware");
const getRecentUsers = require("../controllers/admin/getRecentUsers.controller");

const getRecentLeads = require("../controllers/admin/getRecentLeads.controller");
const getDashboardStats = require("../controllers/admin/getDashboardStats.controller");
const getLeadChart = require("../controllers/admin/getLeadChart.controller");
const getPlatformChart = require("../controllers/admin/getPlatformChart.controller");
// const getRevenue = require("../controllers/admin/getRevenue.controller");
router.get(
  "/dashboard",
  protect,
  admin,
  getDashboardStats
);


router.get(
  "/recent-users",
  protect,
  admin,
  getRecentUsers
);

router.get(
  "/recent-leads",
  protect,
  admin,
  getRecentLeads
);

router.get(
  "/lead-chart",
  protect,
  admin,
  getLeadChart
);

router.get(
  "/platform-chart",
  protect,
  admin,
  getPlatformChart
);




// router.get(
//   "/revenue",
//   protect,
//   admin,
//   getRevenue
// );

module.exports = router;