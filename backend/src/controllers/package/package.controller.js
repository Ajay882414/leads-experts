const Package = require("../../models/Package");
const Platform = require("../../models/Platform");
const Lead = require("../../models/Lead");
const asyncHandler = require("../../utils/asyncHandler");

// =====================================================
// 1. CREATE PACKAGE CARD (Admin)
// =====================================================
const createPackage = asyncHandler(async (req, res) => {
  const {
    platform,
    name,
    category,
    pricePerLead,
    deliveryTime,
    badges,
    minimumPurchase,
  } = req.body;

  if (!platform || !name || !category || !pricePerLead) {
    return res.status(400).json({
      success: false,
      message: "Platform, package name, category, and pricePerLead are required",
    });
  }

  const platformExists = await Platform.findById(platform);
  if (!platformExists) {
    return res.status(404).json({
      success: false,
      message: "Parent platform not found",
    });
  }

  const newPackage = await Package.create({
    platform,
    name: name.trim(),
    category: category.trim(),
    pricePerLead: Number(pricePerLead),
    deliveryTime: deliveryTime || "24 hours",
    badges: badges && badges.length ? badges : ["Verified"],
    minimumPurchase: Number(minimumPurchase) || 1,
  });

  res.status(201).json({
    success: true,
    message: "Package card created successfully",
    package: newPackage,
  });
});

// =====================================================
// 2. GET PACKAGES BY PLATFORM (User Flow)
// =====================================================
const getPackagesByPlatform = asyncHandler(async (req, res) => {
  const { platformId } = req.params;

  const platform = await Platform.findById(platformId);
  if (!platform) {
    return res.status(404).json({
      success: false,
      message: "Platform not found",
    });
  }

  const packages = await Package.find({
    platform: platformId,
    status: "ACTIVE",
  }).sort({ createdAt: -1 });

  // Unique categories list for tab filters
  const categories = [
    "All",
    ...new Set(packages.map((pkg) => pkg.category).filter(Boolean)),
  ];

  res.status(200).json({
    success: true,
    platform: {
      _id: platform._id,
      name: platform.name,
      slug: platform.slug,
      description: platform.description,
      icon: platform.icon,
      color: platform.color,
      pricePerLead: platform.pricePerLead,
    },
    categories,
    packages,
  });
});

// =====================================================
// 3. GET ALL PACKAGES (Admin Flow)
// =====================================================
const getAllPackages = asyncHandler(async (req, res) => {
  const { platform } = req.query;
  const filter = {};
  if (platform) filter.platform = platform;

  const packages = await Package.find(filter)
    .populate("platform", "name slug color")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    packages,
  });
});

// =====================================================
// 4. UPDATE PACKAGE CARD (Admin)
// =====================================================
const updatePackage = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const updatedPackage = await Package.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedPackage) {
    return res.status(404).json({
      success: false,
      message: "Package not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Package updated successfully",
    package: updatedPackage,
  });
});

// =====================================================
// 5. DELETE PACKAGE CARD (Admin)
// =====================================================
const deletePackage = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const pkg = await Package.findById(id);
  if (!pkg) {
    return res.status(404).json({
      success: false,
      message: "Package not found",
    });
  }

  // Delete all leads associated with this package
  await Lead.deleteMany({ package: id });
  await pkg.deleteOne();

  res.status(200).json({
    success: true,
    message: "Package and its leads deleted successfully",
  });
});

module.exports = {
  createPackage,
  getPackagesByPlatform,
  getAllPackages,
  updatePackage,
  deletePackage,
};