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
          "name slug pricePerLead"
        )
        .populate(
          "purchasedLeads",
          "fullName phone age gender profession source status"
        )
        .lean();

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // ==========================================
    // ADMIN OR ORDER OWNER
    // ==========================================

    const isOwner =
      String(order.user?._id) ===
      String(req.user._id);

    const isAdmin =
      req.user.role === "admin" ||
      req.user.role === "ADMIN";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message:
          "You are not allowed to view this order",
      });
    }

    return res.status(200).json({
      success: true,

      order,
    });
  });

module.exports =
  getOrder;