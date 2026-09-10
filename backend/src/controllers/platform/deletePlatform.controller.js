const Platform = require("../../models/Platform");
const Lead = require("../../models/Lead");
const asyncHandler = require("../../utils/asyncHandler");

const deletePlatform = asyncHandler(async (req, res) => {
  const platform = await Platform.findById(req.params.id);

  if (!platform) {
    return res.status(404).json({
      success: false,
      message: "Platform not found",
    });
  }

  const leadCount = await Lead.countDocuments({
    platform: platform._id,
  });

  if (leadCount > 0) {
    return res.status(400).json({
      success: false,
      message:
        "Platform cannot be deleted because leads are associated with it. Please deactivate it instead.",
      leadCount,
    });
  }

  await platform.deleteOne();

  res.status(200).json({
    success: true,
    message: "Platform deleted successfully",
  });
});

module.exports = deletePlatform;