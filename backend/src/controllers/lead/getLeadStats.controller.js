const Lead = require("../../models/Lead");
const asyncHandler = require("../../utils/asyncHandler");

const getLeadStats = asyncHandler(
  async (req, res) => {
    const [
      totalLeads,
      availableLeads,
      reservedLeads,
      soldLeads,
    ] = await Promise.all([
      Lead.countDocuments(),

      Lead.countDocuments({
        status: "AVAILABLE",
      }),

      Lead.countDocuments({
        status: "RESERVED",
      }),

      Lead.countDocuments({
        status: "SOLD",
      }),
    ]);

    res.status(200).json({
      success: true,

      stats: {
        totalLeads,

        availableLeads,

        reservedLeads,

        soldLeads,
      },
    });
  }
);

module.exports = getLeadStats;