const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    // ========================================
    // PLATFORM
    // ========================================

    platform: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Platform",
      required: true,
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

// Platform + status
leadSchema.index({
  platform: 1,
  status: 1,
});

// Platform + profession + status
leadSchema.index({
  platform: 1,
  profession: 1,
  status: 1,
});

// IMPORTANT:
// Same phone cannot exist twice
// inside the same platform.
leadSchema.index(
  {
    platform: 1,
    phone: 1,
  },
  {
    unique: true,
  }
);

// Ownership lookup
leadSchema.index({
  soldTo: 1,
  order: 1,
});

module.exports = mongoose.model("Lead", leadSchema);