const Lead = require("../../models/Lead");
const asyncHandler = require("../../utils/asyncHandler");

const getRecentLeads = asyncHandler(async (req, res) => {
  const leads = await Lead.find()
    .populate(
      "platform",
      "name"
    )
    .sort({
      createdAt: -1,
    })
    .limit(10);

  res.status(200).json({
    success: true,
    leads,
  });
});

module.exports = getRecentLeads;