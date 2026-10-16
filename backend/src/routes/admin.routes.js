const express = require("express");

const router = express.Router();

const protect = require("../middlewares/auth.middleware");
const admin = require("../middlewares/admin.middleware");

const getRecentUsers = require("../controllers/admin/getRecentUsers.controller");
const getRecentLeads = require("../controllers/admin/getRecentLeads.controller");
const getDashboardStats = require("../controllers/admin/getDashboardStats.controller");
const getLeadChart = require("../controllers/admin/getLeadChart.controller");
const getPlatformChart = require("../controllers/admin/getPlatformChart.controller");
const {
  getAllReferralClients,
  getClientDetailedReport,
} = require("../controllers/admin/getClientReport.controller");

// 📊 Isolated Daily Reports Controller
const getDailyReports = require("../controllers/admin/dailyReport.controller");

router.get(
  "/dashboard",
  protect,
  admin,
  getDashboardStats
);

// ==========================================
// NEW DAILY & TIMELINE METRICS ROUTE
// ==========================================
router.get(
  "/daily-reports",
  protect,
  admin,
  getDailyReports
);

// ==========================================
// REFERRAL CLIENTS & TEAM REPORTS
// ==========================================
router.get(
  "/referral-clients",
  protect,
  admin,
  getAllReferralClients
);

router.get(
  "/referral-report/:clientId",
  protect,
  admin,
  getClientDetailedReport
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

module.exports = router;