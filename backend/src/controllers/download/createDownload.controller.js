const Download = require("../../models/Download");
const Order = require("../../models/Order");
const asyncHandler = require("../../utils/asyncHandler");

const createDownload = asyncHandler(async (req, res) => {
  const { orderId } = req.body;

  // ==========================================
  // VALIDATE ORDER ID
  // ==========================================
  if (!orderId) {
    return res.status(400).json({
      success: false,
      message: "Order ID is required",
    });
  }

  // ==========================================
  // FIND ORDER
  // ==========================================
  const order = await Order.findById(orderId);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found",
    });
  }

  // ==========================================
  // CREATE DOWNLOAD RECORD
  // ==========================================
  const download = await Download.create({
    user: order.user,
    order: order._id,
    platform: order.platform,
    totalLeads: order.quantity,
    fileName: `order-${order._id}.csv`,
  });

  // ==========================================
  // RESPONSE
  // ==========================================
  res.status(201).json({
    success: true,
    message: "Download record created successfully",
    download,
  });
});

module.exports = createDownload;