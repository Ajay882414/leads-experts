const mongoose = require("mongoose");

const orderSchema =
  new mongoose.Schema(
    {
      // ==========================================
      // USER
      // ==========================================

      user: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,

        index: true,
      },

      // ==========================================
      // PLATFORM
      // ==========================================

      platform: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "Platform",

        required: true,

        index: true,
      },

      // ==========================================
      // QUANTITY
      // ==========================================

      quantity: {
        type: Number,

        required: true,

        min: 1,
      },

      // ==========================================
      // PRICE
      // ==========================================

      pricePerLead: {
        type: Number,

        required: true,

        min: 0,
      },

      // ==========================================
      // TOTAL
      // ==========================================

      totalAmount: {
        type: Number,

        required: true,

        min: 0,
      },

      // ==========================================
      // STATUS
      // ==========================================

      status: {
        type: String,

        enum: [
          "Pending",
          "Completed",
          "Cancelled",
        ],

        default: "Completed",

        index: true,
      },

      // ==========================================
      // PURCHASED LEADS
      // ==========================================

      purchasedLeads: [
        {
          type:
            mongoose.Schema.Types.ObjectId,

          ref: "Lead",
        },
      ],
    },
    {
      timestamps: true,
    }
  );

// ==========================================
// INDEXES
// ==========================================

orderSchema.index({
  user: 1,
  createdAt: -1,
});

orderSchema.index({
  platform: 1,
  createdAt: -1,
});

orderSchema.index({
  status: 1,
  createdAt: -1,
});

module.exports =
  mongoose.model(
    "Order",
    orderSchema
  );