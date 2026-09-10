const Platform = require("../../models/Platform");
const asyncHandler = require("../../utils/asyncHandler");

const getPlatformPrice = asyncHandler(async (req, res) => {
  const platform = await Platform.findById(req.params.id).select(
    "name slug pricePerLead minimumPurchase availableLeads status"
  );

  if (!platform) {
    return res.status(404).json({
      success: false,
      message: "Platform not found",
    });
  }

  if (platform.status !== "ACTIVE") {
    return res.status(400).json({
      success: false,
      message: "Platform is inactive",
    });
  }

  res.status(200).json({
    success: true,
    platform,
  });
});

module.exports = getPlatformPrice;