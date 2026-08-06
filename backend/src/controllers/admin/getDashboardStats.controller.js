const User = require("../../models/User");
const Platform = require("../../models/Platform");
const Lead = require("../../models/Lead");

const asyncHandler = require("../../utils/asyncHandler");

const getDashboardStats = asyncHandler(async (req, res) => {
  const totalUsers = await User.countDocuments();

  const totalPlatforms = await Platform.countDocuments();

  const totalLeads = await Lead.countDocuments();

  const availableLeads = await Lead.countDocuments({
    status: "AVAILABLE",
  });

  const soldLeads = await Lead.countDocuments({
    status: "SOLD",
  });

  const reservedLeads = await Lead.countDocuments({
    status: "RESERVED",
  });

  res.status(200).json({
    success: true,

    stats: {
      totalUsers,
      totalPlatforms,
      totalLeads,
      availableLeads,
      soldLeads,
      reservedLeads,
    },
  });
});

module.exports = getDashboardStats;