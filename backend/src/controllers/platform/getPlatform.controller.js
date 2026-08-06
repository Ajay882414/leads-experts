const Platform = require("../../models/Platform");
const asyncHandler = require("../../utils/asyncHandler");

const getPlatform = asyncHandler(
  async (req, res) => {
    const platform =
      await Platform.findById(
        req.params.id
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
      platform,
    });
  }
);

module.exports = getPlatform;