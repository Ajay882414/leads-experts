const Lead = require("../../models/Lead");
const asyncHandler = require("../../utils/asyncHandler");

const updateLead = asyncHandler(async (req, res) => {
  const {
    fullName,
    phone,
    age,
    gender,
    profession,
    source,
  } = req.body;

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
        "Purchased lead cannot be modified",
    });
  }

  // ========================================
  // UPDATE ONLY ALLOWED FIELDS
  // ========================================

  if (fullName !== undefined) {
    lead.fullName = String(
      fullName
    ).trim();
  }

  if (phone !== undefined) {
    const normalizedPhone = String(
      phone
    ).trim();

    const duplicate =
      await Lead.findOne({
        _id: {
          $ne: lead._id,
        },
        platform: lead.platform,
        phone: normalizedPhone,
      });

    if (duplicate) {
      return res.status(409).json({
        success: false,
        message:
          "Another lead with this phone already exists on this platform",
      });
    }

    lead.phone =
      normalizedPhone;
  }

  if (age !== undefined) {
    const numericAge = Number(age);

    if (
      Number.isNaN(numericAge) ||
      numericAge < 0 ||
      numericAge > 120
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid age",
      });
    }

    lead.age = numericAge;
  }

  if (gender !== undefined) {
    lead.gender = String(
      gender
    ).trim();
  }

  if (profession !== undefined) {
    lead.profession = String(
      profession
    ).trim();
  }

  if (source !== undefined) {
    lead.source = String(
      source
    ).trim();
  }

  await lead.save();

  res.status(200).json({
    success: true,
    message:
      "Lead updated successfully",
    lead,
  });
});

module.exports = updateLead;