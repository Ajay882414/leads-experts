const Notification = require("../../models/Notification");
const asyncHandler = require("../../utils/asyncHandler");

const markAsRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);

  if (!notification) {
    return res.status(404).json({
      success: false,
      message: "Notification not found",
    });
  }

  notification.isRead = true;

  await notification.save();

  res.status(200).json({
    success: true,
    message: "Notification marked as read",
    notification,
  });
});

module.exports = markAsRead;