const Lead = require("../../models/Lead");
const Platform = require("../../models/Platform");
const asyncHandler = require("../../utils/asyncHandler");

const createLead = asyncHandler(
  async (req, res) => {
    const {
      platform,
      email,
      phone,
    } = req.body;

    const platformExists =
      await Platform.findById(platform);

    if (!platformExists) {
      return res.status(404).json({
        success: false,
        message:
          "Platform not found",
      });
    }

    const duplicate =
      await Lead.findOne({
        $or: [
          { email },
          { phone },
        ],
      });

    if (duplicate) {
      return res.status(409).json({
        success: false,
        message:
          "Lead already exists",
      });
    }

    const lead =
      await Lead.create(req.body);

    platformExists.totalLeads += 1;
    platformExists.availableLeads += 1;

    await platformExists.save();

    res.status(201).json({
      success: true,
      message:
        "Lead created successfully",
      lead,
    });
  }
);

module.exports = createLead;