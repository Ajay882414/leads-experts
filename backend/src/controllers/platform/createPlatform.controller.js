const Platform = require("../../models/Platform");
const asyncHandler = require("../../utils/asyncHandler");
const createNotification = require("../../utils/createNotification");

const createPlatform = asyncHandler(async (req, res) => {
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

  const normalizedName = name.trim();
  const normalizedSlug = slug.trim().toLowerCase();

  const exists = await Platform.findOne({
    $or: [
      { name: normalizedName },
      { slug: normalizedSlug },
    ],
  });

  if (exists) {
    return res.status(409).json({
      success: false,
      message: "Platform name or slug already exists",
    });
  }

  const platform = await Platform.create({
    name: normalizedName,
    slug: normalizedSlug,
    icon: icon || "",
    banner: banner || "",
    description: description || "",
    color: color || "#3B82F6",
    pricePerLead: Number(pricePerLead),
    minimumPurchase:
      minimumPurchase !== undefined
        ? Number(minimumPurchase)
        : 1,
    status: status || "ACTIVE",
  });

 // Notification trigger for Platform Creation (Visible to All)
  await createNotification({
    title: "New Platform Added! 🚀",
    message: `Fresh platform "${platform.name}" has been launched. Explore leads now!`,
    type: "Platform",
    target: "all",
  });

  res.status(201).json({
    success: true,
    message: "Platform created successfully",
    platform,
  });
});

module.exports = createPlatform;