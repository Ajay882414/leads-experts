const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    platform: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Platform",
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    pricePerLead: {
      type: Number,
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Completed",
        "Cancelled",
      ],
      default: "Pending",
    },

    purchasedLeads: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lead",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Order",
  orderSchema
);