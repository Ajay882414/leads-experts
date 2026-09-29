const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema(
  {
    // Parent Platform (Instagram, Facebook, etc.)
    platform: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Platform",
      required: [true, "Parent platform is required"],
      index: true,
    },

    // Card Title (e.g. "Instagram — Housewife Leads" ya "Facebook — Business Owners")
    name: {
      type: String,
      required: [true, "Package name is required"],
      trim: true,
      maxlength: 100,
    },

    // Category identifier (e.g. "Housewife", "Students", "Working Pro")
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      index: true,
    },

    // Is card ka apna price per lead
    pricePerLead: {
      type: Number,
      required: [true, "Price per lead is required"],
      min: [0.01, "Price must be greater than zero"],
    },

    // Delivery time (UI par "24 hours" dikhane ke liye)
    deliveryTime: {
      type: String,
      default: "24 hours",
      trim: true,
    },

    // Badges array (e.g. ["Hot", "Verified"])
    badges: {
      type: [String],
      default: ["Verified"],
    },

    // Minimum purchase quantity
    minimumPurchase: {
      type: Number,
      default: 1,
      min: 1,
    },

    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
      index: true,
    },

    // Lead stock counters specific to this package
    totalLeads: {
      type: Number,
      default: 0,
      min: 0,
    },

    availableLeads: {
      type: Number,
      default: 0,
      min: 0,
    },

    soldLeads: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

packageSchema.index({ platform: 1, status: 1 });
packageSchema.index({ platform: 1, category: 1 });

module.exports = mongoose.model("Package", packageSchema);