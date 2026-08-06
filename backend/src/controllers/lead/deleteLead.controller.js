const Lead = require("../../models/Lead");
const Platform = require("../../models/Platform");
const asyncHandler = require("../../utils/asyncHandler");

const deleteLead = asyncHandler(
  async (req, res) => {
    const lead =
      await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    await Platform.findByIdAndUpdate(
      lead.platform,
      {
        $inc: {
          totalLeads: -1,
          availableLeads: -1,
        },
      }
    );

    await lead.deleteOne();

    res.status(200).json({
      success: true,
      message:
        "Lead deleted successfully",
    });
  }
);

module.exports = deleteLead;