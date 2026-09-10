const Lead = require("../../models/Lead");
const Platform = require("../../models/Platform");
const asyncHandler = require("../../utils/asyncHandler");

const deleteLead = asyncHandler(async (req, res) => {
  const lead = await Lead.findById(
    req.params.id
  );

  if (!lead) {
    return res.status(404).json({
      success: false,
      message: "Lead not found",
    });
  }

  // ========================================
  // SOLD LEAD PROTECTION
  // ========================================

  if (lead.status === "SOLD") {
    return res.status(400).json({
      success: false,
      message:
        "Purchased lead cannot be deleted",
    });
  }

  // ========================================
  // DELETE
  // ========================================

  await lead.deleteOne();

  // ========================================
  // UPDATE PLATFORM COUNTERS
  // ========================================

  await Platform.findByIdAndUpdate(
    lead.platform,
    {
      $inc: {
        totalLeads: -1,
        availableLeads:
          lead.status === "AVAILABLE"
            ? -1
            : 0,
      },
    }
  );

  res.status(200).json({
    success: true,
    message:
      "Lead deleted successfully",
  });
});

module.exports = deleteLead;