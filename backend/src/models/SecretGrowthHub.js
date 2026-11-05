const mongoose = require("mongoose");

const secretGrowthHubSchema = new mongoose.Schema(
  {
    // Content caption / text / message jo admin likhega
    content: {
      type: String,
      trim: true,
      default: "",
    },

    // Post Type (Auto-detected from file or manual link)
    postType: {
      type: String,
      enum: ["TEXT", "IMAGE", "VIDEO", "AUDIO", "PDF", "LINK"],
      default: "TEXT",
    },

    // Uploaded local file path ya external URL (e.g. /uploads/secret-growth-hub/hub-xxx.mp4)
    fileUrl: {
      type: String,
      default: "",
      trim: true,
    },

    // Original file name (e.g. "sales-masterclass.pdf")
    fileName: {
      type: String,
      default: "",
    },

    // External community / session link (WhatsApp, Telegram, Zoom, Instagram)
    externalLink: {
      type: String,
      default: "",
      trim: true,
    },

    // Button label (e.g. "Join WhatsApp Community", "Open Zoom Session")
    buttonText: {
      type: String,
      default: "Open Link",
      trim: true,
    },

    // Pin important announcement at top
    isPinned: {
      type: Boolean,
      default: false,
    },

    // Status to show/hide
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

secretGrowthHubSchema.index({ isPinned: -1, createdAt: -1 });

module.exports = mongoose.model("SecretGrowthHub", secretGrowthHubSchema);