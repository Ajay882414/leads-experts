const Lead = require("../../models/Lead");
const asyncHandler = require("../../utils/asyncHandler");

const getLeads = asyncHandler(async (req, res) => {
  // ========================================
  // PAGINATION
  // ========================================

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

  const skip = (page - 1) * limit;

  // ========================================
  // QUERY PARAMETERS
  // ========================================

  const {
    search,
    platform,
    status,
    profession,
    gender,
  } = req.query;

  // ========================================
  // FILTER
  // ========================================

  const filter = {};

  // ========================================
  // PLATFORM
  // ========================================

  if (platform) {
    filter.platform = platform;
  }

  // ========================================
  // STATUS
  // ========================================

  if (status) {
    filter.status = status;
  }

  // ========================================
  // PROFESSION
  // ========================================

  if (profession) {
    filter.profession = {
      $regex: profession,
      $options: "i",
    };
  }

  // ========================================
  // GENDER
  // ========================================

  if (gender) {
    filter.gender = {
      $regex: gender,
      $options: "i",
    };
  }

  // ========================================
  // SEARCH
  // ========================================

  if (search) {
    filter.$or = [
      {
        fullName: {
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
      {
        profession: {
          $regex: search,
          $options: "i",
        },
      },
      {
        source: {
          $regex: search,
          $options: "i",
        },
      },
      {
        gender: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  // ========================================
  // FETCH
  // ========================================

  const [leads, total] = await Promise.all([
    Lead.find(filter)
      .populate(
        "platform",
        "name slug pricePerLead"
      )
      .populate(
        "soldTo",
        "fullName email"
      )
      .populate(
        "order",
        "_id status totalAmount"
      )
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit)
      .lean(),

    Lead.countDocuments(filter),
  ]);

  // ========================================
  // RESPONSE
  // ========================================

  res.status(200).json({
    success: true,

    total,

    page,

    limit,

    totalPages: Math.ceil(
      total / limit
    ),

    leads,
  });
});

module.exports = getLeads;