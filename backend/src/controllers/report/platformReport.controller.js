const Platform = require("../../models/Platform");
const asyncHandler = require("../../utils/asyncHandler");

const platformReport =
  asyncHandler(async (req, res) => {

    const platforms =
      await Platform.find().sort({
        createdAt: -1,
      });

    res.status(200).json({

      success: true,

      platforms,

    });

  });

module.exports =
  platformReport;