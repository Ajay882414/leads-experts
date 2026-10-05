const Platform = require("../../models/Platform");
const Package = require("../../models/Package");
const Lead = require("../../models/Lead");
const asyncHandler = require("../../utils/asyncHandler");

const getPlatforms = asyncHandler(async (req, res) => {
  // 1. Sabhi platforms fetch karo
  const platforms = await Platform.find()
    .sort({ createdAt: -1 })
    .lean();

  // 2. Har platform ke actual package cards aur unki real leads calculate karo
  const platformsWithCalculatedStats = await Promise.all(
    platforms.map(async (platform) => {
      // Platform ke sabhi existing packages nikalo
      const packages = await Package.find({
        platform: platform._id,
      }).select("_id category status");

      const packageIds = packages.map((pkg) => pkg._id);

      // Active packages ki unique categories list
      const activePackages = packages.filter((pkg) => pkg.status === "ACTIVE");
      const categories = [
        ...new Set(activePackages.map((pkg) => pkg.category).filter(Boolean)),
      ];

      // Agar is platform ke andar koi package card hi nahi hai
      if (packageIds.length === 0) {
        return {
          ...platform,
          totalLeads: 0,
          availableLeads: 0,
          soldLeads: 0,
          categories: categories.length
            ? categories
            : ["Housewife", "Students", "Working Pro"],
        };
      }

      // Sirf active/existing packages se linked leads hi count karo
      // Taaki purane deleted cards ki stale leads count na ho
      const [totalLeads, availableLeads, soldLeads] = await Promise.all([
        Lead.countDocuments({ package: { $in: packageIds } }),
        Lead.countDocuments({ package: { $in: packageIds }, status: "AVAILABLE" }),
        Lead.countDocuments({ package: { $in: packageIds }, status: "SOLD" }),
      ]);

      return {
        ...platform,
        totalLeads,
        availableLeads,
        soldLeads,
        categories: categories.length
          ? categories
          : ["Housewife", "Students", "Working Pro"],
      };
    })
  );

  res.status(200).json({
    success: true,
    count: platformsWithCalculatedStats.length,
    platforms: platformsWithCalculatedStats,
  });
});

module.exports = getPlatforms;