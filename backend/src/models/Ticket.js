const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    ticketId: {
      type: String,
      unique: true,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      enum: ["LEADS_ISSUE", "PAYMENT_ISSUE", "ACCOUNT_ISSUE", "GENERAL_QUERY"],
      default: "GENERAL_QUERY",
      required: true,
    },
    orderId: {
      type: String,
      trim: true,
      default: "",
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
      trim: true,
      maxlength: 120,
    },
    message: {
      type: String,
      required: [true, "Message description is required"],
      trim: true,
      maxlength: 2000,
    },
    status: {
      type: String,
      enum: ["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"],
      default: "OPEN",
    },
    adminReply: {
      type: String,
      default: "",
    },
    resolvedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

ticketSchema.pre("save", async function () {
  if (!this.ticketId) {
    this.ticketId = `TCK-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;
  }
});

module.exports = mongoose.model("Ticket", ticketSchema);