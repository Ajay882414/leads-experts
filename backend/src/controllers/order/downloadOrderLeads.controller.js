const Order = require("../../models/Order");
const Lead = require("../../models/Lead");

const asyncHandler = require("../../utils/asyncHandler");

const downloadOrderLeads =
  asyncHandler(async (req, res) => {
    const order =
      await Order.findById(
        req.params.id
      );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // ==========================================
    // USER CAN ONLY ACCESS OWN ORDER
    // ==========================================

    const isOwner =
      String(order.user) ===
      String(req.user._id);

    const isAdmin =
      req.user.role === "admin" ||
      req.user.role === "ADMIN";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message:
          "You are not allowed to access this order",
      });
    }

    // ==========================================
    // GET PURCHASED LEADS
    // ==========================================

    const leads =
      await Lead.find({
        _id: {
          $in: order.purchasedLeads,
        },

        soldTo: order.user,

        order: order._id,
      })
        .select(
          "fullName phone age gender profession source sourceTimestamp"
        )
        .lean();

    return res.status(200).json({
      success: true,

      orderId: order._id,

      total: leads.length,

      leads,
    });
  });

module.exports =
  downloadOrderLeads;