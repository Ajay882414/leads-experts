const mongoose = require("mongoose");

const downloadSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },

    platform: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Platform",
      required: true,
    },

    totalLeads: {
      type: Number,
      required: true,
    },

    fileName: {
      type: String,
      default: "",
    },

    downloadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Download",
  downloadSchema
);