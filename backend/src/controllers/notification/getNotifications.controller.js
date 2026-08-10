const Notification =
  require("../../models/Notification");

const asyncHandler =
  require("../../utils/asyncHandler");

const getNotifications =
  asyncHandler(async (req, res) => {

    const notifications =
      await Notification.find()
        .sort({
          createdAt: -1,
        });

    res.status(200).json({
      success: true,
      count:
        notifications.length,
      notifications,
    });

  });

module.exports =
  getNotifications;