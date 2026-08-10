const Download = require("../../models/Download");
const asyncHandler = require("../../utils/asyncHandler");

const getDownloadStats =
  asyncHandler(async (req, res) => {

    const totalDownloads =
      await Download.countDocuments();

    const totalLeads =
      await Download.aggregate([
        {
          $group: {
            _id: null,
            total: {
              $sum: "$totalLeads",
            },
          },
        },
      ]);

    res.status(200).json({
      success: true,

      stats: {
        totalDownloads,

        totalLeads:
          totalLeads.length
            ? totalLeads[0].total
            : 0,
      },
    });

  });

module.exports =
  getDownloadStats;