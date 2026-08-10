const Notification = require("../../models/Notification");
const asyncHandler = require("../../utils/asyncHandler");

const getNotification = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);

  if (!notification) {
    return res.status(404).json({
      success: false,
      message: "Notification not found",
    });
  }

  res.status(200).json({
    success: true,
    notification,
  });
});

module.exports = getNotification;