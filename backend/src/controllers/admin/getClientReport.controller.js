const User = require("../../models/User");
const Order = require("../../models/Order");
const asyncHandler = require("../../utils/asyncHandler");

// 1. Get All Clients Who Have a Referral Code (Dropdown ke liye)
const getAllReferralClients = asyncHandler(async (req, res) => {
  const clients = await User.find({
    referralCode: { $exists: true, $ne: null },
  }).select("fullName email referralCode");

  return res.status(200).json({
    success: true,
    clients,
  });
});

// 2. Get Complete Report of a Client's Team & Purchases
const getClientDetailedReport = asyncHandler(async (req, res) => {
  const { clientId } = req.params;

  // Verify Client
  const client = await User.findById(clientId).select(
    "fullName email referralCode"
  );

  if (!client) {
    return res.status(404).json({
      success: false,
      message: "Client not found",
    });
  }

  // 1. Find all users registered via this client's referral link
  const referredUsers = await User.find({ referredBy: client._id })
    .select("fullName email mobileNumber platform createdAt")
    .sort({ createdAt: -1 });

  const referredUserIds = referredUsers.map((u) => u._id);

  // 2. Find all orders placed by these referred users
  const orders = await Order.find({
    user: { $in: referredUserIds },
  })
    .populate("user", "fullName email mobileNumber")
    .populate("platform", "name")
    .populate("package", "name pricePerLead")
    .sort({ createdAt: -1 });

  // 3. Calculate summary metrics
  const totalLeadsPurchased = orders.reduce(
    (sum, order) => sum + (order.quantity || 0),
    0
  );
  const totalRevenue = orders.reduce(
    (sum, order) => sum + (order.totalAmount || 0),
    0
  );

  return res.status(200).json({
    success: true,
    summary: {
      client: {
        id: client._id,
        name: client.fullName,
        email: client.email,
        referralCode: client.referralCode,
      },
      totalUsersJoined: referredUsers.length,
      totalOrdersPlaced: orders.length,
      totalLeadsPurchased,
      totalRevenue,
    },
    users: referredUsers,
    orders: orders.map((order) => ({
      orderId: order._id,
      user: {
        id: order.user?._id,
        name: order.user?.fullName,
        email: order.user?.email,
      },
      platform: order.platform?.name || "N/A",
      packageCard: order.package?.name || "Direct / Custom",
      quantity: order.quantity,
      pricePerLead: order.pricePerLead,
      totalAmount: order.totalAmount,
      status: order.status,
      date: order.createdAt,
    })),
  });
});

module.exports = {
  getAllReferralClients,
  getClientDetailedReport,
};