const Lead = require("../../models/Lead");
const asyncHandler = require("../../utils/asyncHandler");

const updateLead = asyncHandler(
  async (req, res) => {
    const lead =
      await Lead.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Lead updated successfully",
      lead,
    });
  }
);

module.exports = updateLead;