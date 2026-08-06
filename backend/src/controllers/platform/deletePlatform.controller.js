const Platform = require("../../models/Platform");
const asyncHandler = require("../../utils/asyncHandler");

const deletePlatform = asyncHandler(
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

    await platform.deleteOne();

    res.status(200).json({
      success: true,
      message:
        "Platform deleted successfully",
    });
  }
);

module.exports = deletePlatform;