const Order = require("../../models/Order");

const asyncHandler = require("../../utils/asyncHandler");

const getMyOrders =
  asyncHandler(async (req, res) => {
    const orders =
      await Order.find({
        user: req.user._id,
      })
        .populate(
          "platform",
          "name slug pricePerLead"
        )
        .sort({
          createdAt: -1,
        })
        .lean();

    return res.status(200).json({
      success: true,

      total: orders.length,

      orders,
    });
  });

module.exports =
  getMyOrders;