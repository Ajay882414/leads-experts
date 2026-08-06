const Lead = require("../../models/Lead");
const asyncHandler = require("../../utils/asyncHandler");

const getLeads = asyncHandler(
  async (req, res) => {
    const page =
      Number(req.query.page) || 1;

    const limit =
      Number(req.query.limit) || 20;

    const skip =
      (page - 1) * limit;

      const {
    search,
    platform,
    status,
  } = req.query;

  const filter = {};

  if (search) {
    filter.$or = [
      {
        fullName: {
          $regex: search,
          $options: "i",
        },
      },
      {
        email: {
          $regex: search,
          $options: "i",
        },
      },
      {
        phone: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  if (platform) {
    filter.platform = platform;
  }

  if (status) {
    filter.status = status;
  }
  
    const leads =
      await Lead.find()
        .populate(
          "platform",
          "name"
        )
        .sort({
          createdAt: -1,
        })
        .skip(skip)
        .limit(limit);

    const total =
      await Lead.countDocuments();

    res.json({
      success: true,
      total,
      page,
      totalPages: Math.ceil(
        total / limit
      ),
      leads,
    });
  }
);

module.exports = getLeads;