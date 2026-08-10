const Download = require("../../models/Download");
const asyncHandler = require("../../utils/asyncHandler");

const deleteDownload =
  asyncHandler(async (req, res) => {

    const download =
      await Download.findById(
        req.params.id
      );

    if (!download) {
      return res.status(404).json({
        success: false,
        message:
          "Download not found",
      });
    }

    await download.deleteOne();

    res.status(200).json({
      success: true,
      message:
        "Download deleted successfully",
    });

  });

module.exports =
  deleteDownload;