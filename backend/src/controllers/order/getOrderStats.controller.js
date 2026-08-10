const Order = require("../../models/Order");
const asyncHandler = require("../../utils/asyncHandler");

const getOrderStats = asyncHandler(async (req, res) => {

  const totalOrders =
    await Order.countDocuments();

  const pendingOrders =
    await Order.countDocuments({
      status: "Pending",
    });

  const completedOrders =
    await Order.countDocuments({
      status: "Completed",
    });

  const cancelledOrders =
    await Order.countDocuments({
      status: "Cancelled",
    });

  res.status(200).json({
    success: true,
    stats: {
      totalOrders,
      pendingOrders,
      completedOrders,
      cancelledOrders,
    },
  });

});

module.exports = getOrderStats;