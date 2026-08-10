const User = require("../../models/User");
const Platform = require("../../models/Platform");
const Lead = require("../../models/Lead");
const Order = require("../../models/Order");
const Download = require("../../models/Download");

const asyncHandler = require("../../utils/asyncHandler");

const dashboardReport =
  asyncHandler(async (req, res) => {

    const totalUsers =
      await User.countDocuments();

    const totalPlatforms =
      await Platform.countDocuments();

    const totalLeads =
      await Lead.countDocuments();

    const totalOrders =
      await Order.countDocuments();

    const totalDownloads =
      await Download.countDocuments();

    const revenue =
      await Order.aggregate([
        {
          $group: {
            _id: null,
            total: {
              $sum: "$totalAmount",
            },
          },
        },
      ]);

    res.status(200).json({

      success: true,

      report: {

        totalUsers,

        totalPlatforms,

        totalLeads,

        totalOrders,

        totalDownloads,

        totalRevenue:
          revenue.length
            ? revenue[0].total
            : 0,

      },

    });

  });

module.exports =
  dashboardReport;