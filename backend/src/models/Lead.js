const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    platform: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Platform",
      required: true,
      index: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    country: {
      type: String,
      default: "",
    },

    state: {
      type: String,
      default: "",
    },

    city: {
      type: String,
      default: "",
    },

    business: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      default: "",
    },

    price: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: [
        "AVAILABLE",
        "RESERVED",
        "SOLD",
      ],
      default: "AVAILABLE",
      index: true,
    },

    isSold: {
      type: Boolean,
      default: false,
      index: true,
    },

    soldTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    soldAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

leadSchema.index({
  platform: 1,
  status: 1,
});

leadSchema.index({
  email: 1,
  phone: 1,
});

module.exports = mongoose.model(
  "Lead",
  leadSchema
);