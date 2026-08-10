const Download = require("../../models/Download");
const asyncHandler = require("../../utils/asyncHandler");

const downloadReport =
  asyncHandler(async (req, res) => {

    const downloads =
      await Download.find()
        .populate(
          "user",
          "fullName email"
        )
        .populate(
          "platform",
          "name"
        )
        .populate(
          "order",
          "quantity totalAmount"
        )
        .sort({
          createdAt: -1,
        });

    res.status(200).json({
      success: true,
      totalDownloads:
        downloads.length,
      downloads,
    });

  });

module.exports =
  downloadReport;