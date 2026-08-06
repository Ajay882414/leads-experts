const mongoose = require("mongoose");

const uploadHistorySchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true,
    },

    platform: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Platform",
      required: true,
    },

    totalRows: {
      type: Number,
      default: 0,
    },

    inserted: {
      type: Number,
      default: 0,
    },

    duplicates: {
      type: Number,
      default: 0,
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "UploadHistory",
  uploadHistorySchema
);