const express = require("express");
const router = express.Router();

const protect = require("../middlewares/auth.middleware");
const admin = require("../middlewares/admin.middleware");

const createNotification = require("../controllers/notification/createNotification.controller");
const getNotifications = require("../controllers/notification/getNotifications.controller");
const getNotification = require("../controllers/notification/getNotification.controller");
const markAsRead = require("../controllers/notification/markAsRead.controller");
const deleteNotification = require("../controllers/notification/deleteNotification.controller");
const getNotificationStats = require("../controllers/notification/getNotificationStats.controller");

// ==========================================
// USER & ADMIN NOTIFICATION ENDPOINTS
// ==========================================

// 1. Get All Notifications (User aur Admin dono access kar sakte hain, controller role ke hisaab se filter karega)
router.get(
  "/",
  protect,
  getNotifications
);

// 2. Mark Notification Read (User aur Admin dono apne alerts read mark kar sakte hain)
router.patch(
  "/:id/read",
  protect,
  markAsRead
);

// 3. Get Single Notification
router.get(
  "/:id",
  protect,
  getNotification
);

// ==========================================
// ADMIN-ONLY ACTIONS
// ==========================================

// Get Stats (Admin dashboard ke liye)
router.get(
  "/stats",
  protect,
  admin,
  getNotificationStats
);

// Create Notification Manually
router.post(
  "/",
  protect,
  admin,
  createNotification
);

// Delete Notification
router.delete(
  "/:id",
  protect,
  admin,
  deleteNotification
);

module.exports = router;