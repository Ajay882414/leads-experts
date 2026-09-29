const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    // ========================================
    // PLATFORM & PACKAGE
    // ========================================

    platform: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Platform",
      required: [true, "Platform is required"],
      index: true,
    },

    // Direct reference to the specific package card
    package: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
      required: [true, "Package card is required"],
      index: true,
    },

    // ========================================
    // LEAD INFORMATION
    // ========================================

    fullName: {
      type: String,
      required: [true, "Lead name is required"],
      trim: true,
    },

    phone: {
      type: String,
      required: [true, "Lead phone is required"],
      trim: true,
      index: true,
    },

    age: {
      type: Number,
      required: [true, "Lead age is required"],
      min: 0,
      max: 120,
    },

    gender: {
      type: String,
      trim: true,
      default: "",
    },

    profession: {
      type: String,
      trim: true,
      default: "",
      index: true,
    },

    source: {
      type: String,
      trim: true,
      default: "",
      index: true,
    },

    sourceTimestamp: {
      type: Date,
      default: null,
    },

    // ========================================
    // LEAD STATUS
    // ========================================

    status: {
      type: String,
      enum: ["AVAILABLE", "RESERVED", "SOLD"],
      default: "AVAILABLE",
      index: true,
    },

    // ========================================
    // PURCHASE / OWNERSHIP
    // ========================================

    soldTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true,
    },

    soldAt: {
      type: Date,
      default: null,
    },

    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      default: null,
      index: true,
    },

    soldPrice: {
      type: Number,
      default: null,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

// ========================================
// INDEXES
// ========================================

leadSchema.index({ package: 1, status: 1 });
leadSchema.index({ platform: 1, status: 1 });

// Same phone number cannot exist twice in the same package card
leadSchema.index(
  {
    package: 1,
    phone: 1,
  },
  {
    unique: true,
  }
);

leadSchema.index({
  soldTo: 1,
  order: 1,
});

module.exports = mongoose.model("Lead", leadSchema);