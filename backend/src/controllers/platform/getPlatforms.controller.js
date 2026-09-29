const Platform = require("../../models/Platform");
const Package = require("../../models/Package");
const asyncHandler = require("../../utils/asyncHandler");

const getPlatforms = asyncHandler(async (req, res) => {
  // Sabhi platforms fetch karo
  const platforms = await Platform.find()
    .sort({ createdAt: -1 })
    .lean();

  // Har platform ke andar ke active packages ki categories attach karo
  const platformsWithCategories = await Promise.all(
    platforms.map(async (platform) => {
      const activePackages = await Package.find({
        platform: platform._id,
        status: "ACTIVE",
      }).select("category");

      // Unique categories list nikalo
      const categories = [
        ...new Set(activePackages.map((pkg) => pkg.category).filter(Boolean)),
      ];

      return {
        ...platform,
        categories: categories.length
          ? categories
          : ["Housewife", "Students", "Working Pro"],
      };
    })
  );

  res.status(200).json({
    success: true,
    count: platformsWithCategories.length,
    platforms: platformsWithCategories,
  });
});

module.exports = getPlatforms;