const Order = require("../../models/Order");

const asyncHandler = require("../../utils/asyncHandler");

const getOrders =
  asyncHandler(async (req, res) => {
    const page = Math.max(
      Number(req.query.page) || 1,
      1
    );

    const limit = Math.min(
      Math.max(
        Number(req.query.limit) || 20,
        1
      ),
      100
    );

    const skip =
      (page - 1) * limit;

    const {
      search,
      status,
      platform,
    } = req.query;

    const filter = {};

    // ==========================================
    // STATUS
    // ==========================================

    if (status) {
      filter.status = status;
    }

    // ==========================================
    // PLATFORM
    // ==========================================

    if (platform) {
      filter.platform = platform;
    }

    // ==========================================
    // SEARCH
    // ==========================================

    if (search) {
      filter.$or = [
        {
          "user.fullName": {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    // ==========================================
    // QUERY
    // ==========================================

    const [orders, total] =
      await Promise.all([
        Order.find(filter)
          .populate(
            "user",
            "fullName email mobileNumber"
          )
          .populate(
            "platform",
            "name slug pricePerLead"
          )
          .sort({
            createdAt: -1,
          })
          .skip(skip)
          .limit(limit)
          .lean(),

        Order.countDocuments(filter),
      ]);

    return res.status(200).json({
      success: true,

      total,

      page,

      limit,

      totalPages:
        Math.ceil(total / limit),

      orders,
    });
  });

module.exports =
  getOrders;