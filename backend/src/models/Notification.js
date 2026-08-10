const mongoose = require("mongoose");

const notificationSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
        trim: true,
      },

      message: {
        type: String,
        required: true,
        trim: true,
      },

      type: {
        type: String,
        enum: [
          "User",
          "Lead",
          "Platform",
          "Order",
          "System",
        ],
        default: "System",
      },

      isRead: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Notification",
    notificationSchema
  );