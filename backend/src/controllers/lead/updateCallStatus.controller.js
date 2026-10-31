const Lead = require("../../models/Lead");
const asyncHandler = require("../../utils/asyncHandler");

// ========================================
// UPDATE CALLING STATUS (Buyer Side Mini-CRM)
// PUT /api/leads/:id/call-status
// ========================================
const updateCallStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { callStatus } = req.body;

  const validStatuses = [
    "NEW",
    "CONTACTED",
    "INTERESTED",
    "FOLLOW_UP",
    "NOT_INTERESTED",
    "CLOSED",
  ];

  if (!callStatus || !validStatuses.includes(callStatus)) {
    return res.status(400).json({
      success: false,
      message: "Invalid or missing call status",
    });
  }

  // Security check: User sirf wahi lead update kar sakta hai jo usko sell hui hai
  const lead = await Lead.findOneAndUpdate(
    {
      _id: id,
      soldTo: req.user._id,
    },
    { callStatus },
   { returnDocument: "after", runValidators: true }
  );

  if (!lead) {
    return res.status(404).json({
      success: false,
      message: "Lead record not found or unauthorized",
    });
  }

  res.status(200).json({
    success: true,
    message: "Call status updated successfully",
    lead: {
      id: lead._id,
      callStatus: lead.callStatus,
    },
  });
});

module.exports = updateCallStatus;