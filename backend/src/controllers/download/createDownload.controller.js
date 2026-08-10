const Download = require("../../models/Download");
const Order = require("../../models/Order");
const asyncHandler = require("../../utils/asyncHandler");

const createDownload =
  asyncHandler(async (req, res) => {

    const { orderId } = req.body;

    const order =
      await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message:
          "Order not found",
      });
    }

    const download =
      await Download.create({

        user:
          order.user,

        order:
          order._id,

        platform:
          order.platform,

        totalLeads:
          order.quantity,

        fileName:
          `order-${order._id}.csv`,
      });

    res.status(201).json({
      success: true,
      message:
        "Download created successfully",
      download,
    });

  });

module.exports =
  createDownload;