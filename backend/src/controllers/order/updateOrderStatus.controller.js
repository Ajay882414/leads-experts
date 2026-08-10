const Order = require("../../models/Order");
const asyncHandler = require("../../utils/asyncHandler");

const updateOrderStatus = asyncHandler(async (req, res) => {

  const { status } = req.body;

  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found",
    });
  }

  const allowedStatus = [
    "Pending",
    "Completed",
    "Cancelled",
  ];

  if (!allowedStatus.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Invalid status",
    });
  }

  order.status = status;

  await order.save();

  res.status(200).json({
    success: true,
    message: "Order status updated successfully",
    order,
  });

});

module.exports = updateOrderStatus;