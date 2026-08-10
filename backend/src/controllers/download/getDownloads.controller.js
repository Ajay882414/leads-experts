const Download = require("../../models/Download");
const asyncHandler = require("../../utils/asyncHandler");

const getDownloads = asyncHandler(
  async (req, res) => {

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
      downloads,
    });

  }
);

module.exports =
  getDownloads;