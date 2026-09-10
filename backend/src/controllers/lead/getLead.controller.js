const Lead = require("../../models/Lead");
const asyncHandler = require("../../utils/asyncHandler");

const getLead = asyncHandler(async (req, res) => {
  const lead = await Lead.findById(req.params.id)
    .populate(
      "platform",
      "name slug pricePerLead"
    )
    .populate(
      "soldTo",
      "fullName email"
    )
    .populate(
      "order",
      "_id status totalAmount createdAt"
    );

  if (!lead) {
    return res.status(404).json({
      success: false,
      message: "Lead not found",
    });
  }

  res.status(200).json({
    success: true,
    lead,
  });
});

module.exports = getLead;