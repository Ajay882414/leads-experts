const express = require("express");

const router = express.Router();

const protect =
  require("../middlewares/auth.middleware");

const admin =
  require("../middlewares/admin.middleware");

const createNotification =
  require("../controllers/notification/createNotification.controller");

const getNotifications =
  require("../controllers/notification/getNotifications.controller");

const getNotification =
  require("../controllers/notification/getNotification.controller");

const markAsRead =
  require("../controllers/notification/markAsRead.controller");

const deleteNotification =
  require("../controllers/notification/deleteNotification.controller");

const getNotificationStats =
  require("../controllers/notification/getNotificationStats.controller");

// Get Stats
router.get(
  "/stats",
  protect,
  admin,
  getNotificationStats
);

// Get All
router.get(
  "/",
  protect,
  admin,
  getNotifications
);

// Get Single
router.get(
  "/:id",
  protect,
  admin,
  getNotification
);

// Create
router.post(
  "/",
  protect,
  admin,
  createNotification
);

// Mark Read
router.patch(
  "/:id/read",
  protect,
  admin,
  markAsRead
);

// Delete
router.delete(
  "/:id",
  protect,
  admin,
  deleteNotification
);

module.exports = router;