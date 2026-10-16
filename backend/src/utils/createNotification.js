const Notification = require("../models/Notification");

const createNotification = async ({
  title,
  message,
  type = "System",
  target = "all",
  user = null,
}) => {
  try {
    console.log("🔔 Creating Notification:", { title, message, type, target });

    const notification = await Notification.create({
      title,
      message,
      type,
      target,
      user,
    });

    console.log("✅ Notification Created Successfully ID:", notification._id);
    return notification;
  } catch (error) {
    console.error("❌ Notification Creation Error:", error.message);
  }
};

module.exports = createNotification;