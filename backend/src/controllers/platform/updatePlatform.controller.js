const Platform = require("../../models/Platform");
const asyncHandler = require("../../utils/asyncHandler");

const updatePlatform = asyncHandler(async (req, res) => {
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

  const platform = await Platform.findById(req.params.id);

  if (!platform) {
    return res.status(404).json({
      success: false,
      message: "Platform not found",
    });
  }

  if (name !== undefined) {
    platform.name = name.trim();
  }

  if (slug !== undefined) {
    platform.slug = slug.trim().toLowerCase();
  }

  if (icon !== undefined) {
    platform.icon = icon;
  }

  if (banner !== undefined) {
    platform.banner = banner;
  }

  if (description !== undefined) {
    platform.description = description;
  }

  if (color !== undefined) {
    platform.color = color;
  }

  if (pricePerLead !== undefined) {
    platform.pricePerLead = Number(pricePerLead);
  }

  if (minimumPurchase !== undefined) {
    platform.minimumPurchase = Number(minimumPurchase);
  }

  if (status !== undefined) {
    platform.status = status;
  }

  const duplicate = await Platform.findOne({
    _id: { $ne: platform._id },
    $or: [
      { name: platform.name },
      { slug: platform.slug },
    ],
  });

  if (duplicate) {
    return res.status(409).json({
      success: false,
      message: "Another platform already uses this name or slug",
    });
  }

  await platform.save();

  res.status(200).json({
    success: true,
    message: "Platform updated successfully",
    platform,
  });
});

module.exports = updatePlatform;