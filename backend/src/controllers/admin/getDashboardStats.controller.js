const User = require("../../models/User");
const Platform = require("../../models/Platform");
const Lead = require("../../models/Lead");
const Package = require("../../models/Package");
const asyncHandler = require("../../utils/asyncHandler");

const getDashboardStats = asyncHandler(async (req, res) => {
  // 1. Existing Active Packages ke IDs nikalo
  const validPackages = await Package.find().select("_id");
  const validPackageIds = validPackages.map((pkg) => pkg._id);

  // 2. HARD CLEANUP: Agar package delete ho chuka hai, toh database se orphan leads permanently clean karo
  if (validPackageIds.length === 0) {
    await Lead.deleteMany({});
  } else {
    await Lead.deleteMany({
      package: { $nin: validPackageIds },
    });
  }

  // 3. User aur Platforms total count
  const [totalUsers, totalPlatforms] = await Promise.all([
    User.countDocuments(),
    Platform.countDocuments(),
  ]);

  // 4. Sirf unhi leads ko count karo jo active/existing packages ke andar hain
  const [totalLeads, availableLeads, soldLeads, reservedLeads] =
    await Promise.all([
      Lead.countDocuments({ package: { $in: validPackageIds } }),
      Lead.countDocuments({
        package: { $in: validPackageIds },
        status: "AVAILABLE",
      }),
      Lead.countDocuments({
        package: { $in: validPackageIds },
        status: "SOLD",
      }),
      Lead.countDocuments({
        package: { $in: validPackageIds },
        status: "RESERVED",
      }),
    ]);

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