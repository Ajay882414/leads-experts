const mongoose = require("mongoose");

const platformSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Platform name is required"],
      unique: true,
      trim: true,
      maxlength: 50,
    },

    slug: {
      type: String,
      required: [true, "Platform slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 60,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    icon: {
      type: String,
      default: "",
      trim: true,
    },

    color: {
      type: String,
      default: "#3B82F6",
      trim: true,
    },

    banner: {
      type: String,
      default: "",
      trim: true,
    },

    pricePerLead: {
      type: Number,
      required: [true, "Price per lead is required"],
      min: [0.01, "Price per lead must be greater than zero"],
    },

    minimumPurchase: {
      type: Number,
      default: 1,
      min: [1, "Minimum purchase must be at least 1"],
    },

    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
      index: true,
    },

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

platformSchema.index({ slug: 1 });
platformSchema.index({ status: 1 });

module.exports = mongoose.model("Platform", platformSchema);