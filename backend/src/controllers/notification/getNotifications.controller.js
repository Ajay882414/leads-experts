const Notification = require("../../models/Notification");
const asyncHandler = require("../../utils/asyncHandler");

const getNotifications = asyncHandler(async (req, res) => {
  // Saare notifications fetch karein newest first
  const notifications = await Notification.find({})
    .sort({ createdAt: -1 })
    .limit(50);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  res.status(200).json({
    success: true,
    count: notifications.length,
    unreadCount,
    notifications,
  });
});

module.exports = getNotifications;