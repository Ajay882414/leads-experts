const Order = require("../../models/Order");
const asyncHandler = require("../../utils/asyncHandler");

const getRevenue = asyncHandler(async (req, res) => {
  const revenue = await Order.aggregate([
    {
      $match: {
        paymentStatus: "SUCCESS",
      },
    },
    {
      $group: {
        _id: null,
        totalRevenue: {
          $sum: "$totalAmount",
        },
        totalOrders: {
          $sum: 1,
        },
      },
    },
  ]);

  res.status(200).json({
    success: true,
    revenue:
      revenue.length > 0
        ? revenue[0]
        : {
            totalRevenue: 0,
            totalOrders: 0,
          },
  });
});

module.exports = getRevenue;