const Order = require("../../models/Order");

const asyncHandler = require("../../utils/asyncHandler");

const getOrderStats =
  asyncHandler(async (req, res) => {
    const [
      totalOrders,
      pendingOrders,
      completedOrders,
      cancelledOrders,
      totalRevenue,
    ] = await Promise.all([
      Order.countDocuments(),

      Order.countDocuments({
        status: "Pending",
      }),

      Order.countDocuments({
        status: "Completed",
      }),

      Order.countDocuments({
        status: "Cancelled",
      }),

      Order.aggregate([
        {
          $match: {
            status: "Completed",
          },
        },
        {
          $group: {
            _id: null,
            total: {
              $sum: "$totalAmount",
            },
          },
        },
      ]),
    ]);

    return res.status(200).json({
      success: true,

      stats: {
        totalOrders,

        pendingOrders,

        completedOrders,

        cancelledOrders,

        totalRevenue:
          totalRevenue[0]?.total || 0,
      },
    });
  });

module.exports =
  getOrderStats;