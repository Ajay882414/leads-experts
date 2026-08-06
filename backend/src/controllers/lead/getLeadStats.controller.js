const Lead = require("../../models/Lead");
const asyncHandler = require("../../utils/asyncHandler");

const getLeadStats = asyncHandler(async (req, res) => {
  const [
    totalLeads,
    availableLeads,
    soldLeads,
    reservedLeads,
  ] = await Promise.all([
    Lead.countDocuments(),

    Lead.countDocuments({
      status: "AVAILABLE",
    }),

    Lead.countDocuments({
      status: "SOLD",
    }),

    Lead.countDocuments({
      status: "RESERVED",
    }),
  ]);

  res.status(200).json({
    success: true,
    stats: {
      totalLeads,
      availableLeads,
      soldLeads,
      reservedLeads,
    },
  });
});

module.exports = getLeadStats;