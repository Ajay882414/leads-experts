const Platform = require("../../models/Platform");
const asyncHandler = require("../../utils/asyncHandler");

const getPlatforms = asyncHandler(
  async (req, res) => {
    const platforms =
      await Platform.find().sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      count: platforms.length,
      platforms,
    });
  }
);

module.exports = getPlatforms;