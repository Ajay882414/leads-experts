const Lead = require("../../models/Lead");
const Order = require("../../models/Order");
const asyncHandler = require("../../utils/asyncHandler");

const downloadOrderLead =
  asyncHandler(async (req, res) => {

    const order =
      await Order.findById(
        req.params.orderId
      ).populate(
        "purchasedLeads"
      );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      leads: order.purchasedLeads,
    });

  });

module.exports =
  downloadOrderLead;