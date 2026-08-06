const User = require("../../models/User");
const asyncHandler = require("../../utils/asyncHandler");

const getUserStats = asyncHandler(async (req, res) => {
  const totalUsers = await User.countDocuments();

  const activeUsers = await User.countDocuments({
    status: "ACTIVE",
  });

  const blockedUsers = await User.countDocuments({
    status: "BLOCKED",
  });

  const adminUsers = await User.countDocuments({
    role: "admin",
  });

  res.status(200).json({
    success: true,
    stats: {
      totalUsers,
      activeUsers,
      blockedUsers,
      adminUsers,
    },
  });
});

module.exports = getUserStats;