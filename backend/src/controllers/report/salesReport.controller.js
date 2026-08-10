const Order = require("../../models/Order");
const asyncHandler = require("../../utils/asyncHandler");

const salesReport =
  asyncHandler(async (req, res) => {

    const orders =
      await Order.find()
        .populate(
          "user",
          "fullName email"
        )
        .populate(
          "platform",
          "name"
        )
        .sort({
          createdAt: -1,
        });

    const totalRevenue =
      orders.reduce(
        (sum, order) =>
          sum + order.totalAmount,
        0
      );

    res.status(200).json({
      success: true,
      totalRevenue,
      totalOrders: orders.length,
      orders,
    });

  });

module.exports = salesReport;