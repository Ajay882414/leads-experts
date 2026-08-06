const Platform = require("../../models/Platform");
const asyncHandler = require("../../utils/asyncHandler");

const getPlatformChart = asyncHandler(async (req, res) => {
  const data = await Platform.find().select(
    "name totalLeads soldLeads availableLeads"
  );

  res.status(200).json({
    success: true,
    platforms: data,
  });
});

module.exports = getPlatformChart;