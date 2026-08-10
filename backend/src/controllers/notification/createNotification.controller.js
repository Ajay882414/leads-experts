const Notification =
  require("../../models/Notification");

const asyncHandler =
  require("../../utils/asyncHandler");

const createNotification =
  asyncHandler(async (req, res) => {

    const {
      title,
      message,
      type,
    } = req.body;

    const notification =
      await Notification.create({
        title,
        message,
        type,
      });

    res.status(201).json({
      success: true,
      message:
        "Notification Created Successfully",
      notification,
    });

  });

module.exports =
  createNotification;