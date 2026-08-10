const Order = require("../../models/Order");
const Lead = require("../../models/Lead");
const asyncHandler = require("../../utils/asyncHandler");

const downloadOrderLeads = asyncHandler(
  async (req, res) => {

    const order = await Order.findById(
      req.params.id
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const leads = await Lead.find({
      _id: {
        $in: order.purchasedLeads,
      },
    }).select(
      "fullName email phone country state city business category"
    );

    res.status(200).json({
      success: true,
      total: leads.length,
      leads,
    });

  }
);

module.exports =
  downloadOrderLeads;