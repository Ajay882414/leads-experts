const Order = require("../../models/Order");
const asyncHandler = require("../../utils/asyncHandler");

const getOrders =
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

    res.status(200).json({
      success: true,
      total:
        orders.length,
      orders,
    });

  });

module.exports =
  getOrders;