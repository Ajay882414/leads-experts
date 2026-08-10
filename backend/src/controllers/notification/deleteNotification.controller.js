const Notification = require("../../models/Notification");
const asyncHandler = require("../../utils/asyncHandler");

const deleteNotification = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);

  if (!notification) {
    return res.status(404).json({
      success: false,
      message: "Notification not found",
    });
  }

  await notification.deleteOne();

  res.status(200).json({
    success: true,
    message: "Notification deleted successfully",
  });
});

module.exports = deleteNotification;