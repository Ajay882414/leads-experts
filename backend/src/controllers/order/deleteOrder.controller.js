const Order = require("../../models/Order");
const Platform = require("../../models/Platform");
const Lead = require("../../models/Lead");
const asyncHandler = require("../../utils/asyncHandler");

const deleteOrder = asyncHandler(async (req, res) => {

  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found",
    });
  }

  await Lead.updateMany(
    {
      _id: {
        $in: order.purchasedLeads,
      },
    },
    {
      isSold: false,
    }
  );

  const platform = await Platform.findById(
    order.platform
  );

  if (platform) {

    platform.availableLeads += order.quantity;

    platform.soldLeads -= order.quantity;

    await platform.save();

  }

  await Order.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "Order deleted successfully",
  });

});

module.exports = deleteOrder;