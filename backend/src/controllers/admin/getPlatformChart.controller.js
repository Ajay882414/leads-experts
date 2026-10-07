const Platform = require("../../models/Platform");
const Package = require("../../models/Package");
const Lead = require("../../models/Lead");
const asyncHandler = require("../../utils/asyncHandler");

const getPlatformChart = asyncHandler(async (req, res) => {
  const platforms = await Platform.find().lean();

  const platformData = await Promise.all(
    platforms.map(async (platform) => {
      // Platform ke active packages ke IDs nikalo
      const packages = await Package.find({ platform: platform._id }).select("_id");
      const packageIds = packages.map((pkg) => pkg._id);

      if (packageIds.length === 0) {
        // Database counter bhi 0 update karo
        await Platform.findByIdAndUpdate(platform._id, {
          totalLeads: 0,
          availableLeads: 0,
          soldLeads: 0,
        });

        return {
          _id: platform._id,
          name: platform.name,
          slug: platform.slug,
          color: platform.color,
          totalLeads: 0,
          availableLeads: 0,
          soldLeads: 0,
        };
      }

      // Live counts calculate karo
      const [total, available, sold] = await Promise.all([
        Lead.countDocuments({ package: { $in: packageIds } }),
        Lead.countDocuments({
          package: { $in: packageIds },
          status: "AVAILABLE",
        }),
        Lead.countDocuments({
          package: { $in: packageIds },
          status: "SOLD",
        }),
      ]);

      // Platform model ko sync karo
      await Platform.findByIdAndUpdate(platform._id, {
        totalLeads: total,
        availableLeads: available,
        soldLeads: sold,
      });

      return {
        _id: platform._id,
        name: platform.name,
        slug: platform.slug,
        color: platform.color,
        totalLeads: total,
        availableLeads: available,
        soldLeads: sold,
      };
    })
  );

  res.status(200).json({
    success: true,
    platforms: platformData,
  });
});

module.exports = getPlatformChart;