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
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    icon: {
      type: String,
      default: "",
    },
    color:{
type:String,
default:"#3B82F6"
},

    banner: {
      type: String,
      default: "",
    },

    pricePerLead: {
      type: Number,
      required: true,
      min: 1,
    },

    minimumPurchase: {
      type: Number,
      default: 10,
    },

    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
    },

    totalLeads: {
      type: Number,
      default: 0,
    },

    availableLeads: {
      type: Number,
      default: 0,
    },

    soldLeads: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

platformSchema.index({ slug: 1 });
platformSchema.index({ status: 1 });

module.exports = mongoose.model(
  "Platform",
  platformSchema
);