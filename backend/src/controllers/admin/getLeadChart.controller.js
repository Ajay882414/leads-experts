const Lead = require("../../models/Lead");
const asyncHandler = require("../../utils/asyncHandler");

const getLeadChart = asyncHandler(async (req, res) => {
  const data = await Lead.aggregate([
    {
      $group: {
        _id: "$status",
        total: {
          $sum: 1,
        },
      },
    },
  ]);

  res.status(200).json({
    success: true,
    chart: data,
  });
});

module.exports = getLeadChart;