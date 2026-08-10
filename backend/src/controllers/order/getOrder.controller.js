const Order = require("../../models/Order");
const asyncHandler = require("../../utils/asyncHandler");

const getOrder =
  asyncHandler(async (req, res) => {

    const order =
      await Order.findById(
        req.params.id
      )
        .populate(
          "user",
          "fullName email mobileNumber"
        )
        .populate(
          "platform",
          "name"
        )
        .populate(
          "purchasedLeads"
        );

    if (!order) {
      return res.status(404).json({
        success: false,
        message:
          "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });

  });

module.exports =
  getOrder;