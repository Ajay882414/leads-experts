const Platform = require("../../models/Platform");
const asyncHandler = require("../../utils/asyncHandler");
const createNotification = require("../../utils/createNotification");

const createPlatform = asyncHandler(
  async (req, res) => {

    const {
      name,
      slug,
      icon,
      banner,
      description,
      color,
      pricePerLead,
      minimumPurchase,
      status,
    } = req.body;

    if (!name || !slug) {
      return res.status(400).json({
        success: false,
        message: "Name and slug are required",
      });
    }

    const exists = await Platform.findOne({
      $or: [
        { name },
        { slug },
      ],
    });

    if (exists) {
      return res.status(409).json({
        success: false,
        message: "Platform already exists",
      });
    }

    const platform = await Platform.create({
      name,
      slug,
      icon,
      banner,
      description,
      color,
      pricePerLead,
      minimumPurchase,
      status,
    });

    // ==========================
    // Create Notification
    // ==========================

    await createNotification({
      title: "Platform Created",
      message: `${platform.name} platform created successfully.`,
      type: "Platform",
    });

    res.status(201).json({
      success: true,
      message: "Platform created successfully",
      platform,
    });

  }
);

module.exports = createPlatform;