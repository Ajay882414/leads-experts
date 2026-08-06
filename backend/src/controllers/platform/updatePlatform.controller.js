const Platform = require("../../models/Platform");
const asyncHandler = require("../../utils/asyncHandler");

const updatePlatform = asyncHandler(
  async (req, res) => {
    const platform =
      await Platform.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!platform) {
      return res.status(404).json({
        success: false,
        message:
          "Platform not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Platform updated successfully",
      platform,
    });
  }
);

module.exports = updatePlatform;