const Download = require("../../models/Download");
const asyncHandler = require("../../utils/asyncHandler");

const getDownload = asyncHandler(
  async (req, res) => {

    const download =
      await Download.findById(
        req.params.id
      )
        .populate(
          "user",
          "fullName email"
        )
        .populate(
          "platform",
          "name"
        )
        .populate(
          "order"
        );

    if (!download) {
      return res.status(404).json({
        success: false,
        message:
          "Download not found",
      });
    }

    res.status(200).json({
      success: true,
      download,
    });

  }
);

module.exports =
  getDownload;