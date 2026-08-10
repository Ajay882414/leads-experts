const Notification = require("../models/Notification");

const createNotification = async ({
  title,
  message,
  type = "System",
}) => {
  try {
    await Notification.create({
      title,
      message,
      type,
    });
  } catch (error) {
    console.log(
      "Notification Error:",
      error.message
    );
  }
};

module.exports = createNotification;