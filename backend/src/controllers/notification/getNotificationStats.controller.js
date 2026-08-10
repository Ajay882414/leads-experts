const Notification = require("../../models/Notification");
const asyncHandler = require("../../utils/asyncHandler");

const getNotificationStats = asyncHandler(
  async (req, res) => {

    const total =
      await Notification.countDocuments();

    const unread =
      await Notification.countDocuments({
        isRead: false,
      });

    const read =
      await Notification.countDocuments({
        isRead: true,
      });

    res.status(200).json({
      success: true,
      stats: {
        total,
        read,
        unread,
      },
    });

  }
);

module.exports = getNotificationStats;