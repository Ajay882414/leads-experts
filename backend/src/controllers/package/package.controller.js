const Package = require("../../models/Package");
const Platform = require("../../models/Platform");
const Lead = require("../../models/Lead");
const asyncHandler = require("../../utils/asyncHandler");

// =====================================================
// HELPER: Platform Counters Recalculate & Sync
// =====================================================
const syncPlatformLeadCounters = async (platformId) => {
  try {
    const existingPackages = await Package.find({ platform: platformId }).select("_id");
    const packageIds = existingPackages.map((p) => p._id);

    if (packageIds.length === 0) {
      await Platform.findByIdAndUpdate(platformId, {
        totalLeads: 0,
        availableLeads: 0,
        soldLeads: 0,
      });
      return;
    }

    const [totalLeads, availableLeads, soldLeads] = await Promise.all([
      Lead.countDocuments({ package: { $in: packageIds } }),
      Lead.countDocuments({ package: { $in: packageIds }, status: "AVAILABLE" }),
      Lead.countDocuments({ package: { $in: packageIds }, status: "SOLD" }),
    ]);

    await Platform.findByIdAndUpdate(platformId, {
      totalLeads,
      availableLeads,
      soldLeads,
    });
  } catch (error) {
    console.error("Error syncing platform lead counters:", error);
  }
};

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

  // Sync platform stats
  await syncPlatformLeadCounters(platform);

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

  // Attach live lead stock count to each package card
  const packagesWithStock = await Promise.all(
    packages.map(async (pkg) => {
      const availableStock = await Lead.countDocuments({
        package: pkg._id,
        status: "AVAILABLE",
      });
      return {
        ...pkg.toObject(),
        stock: availableStock,
      };
    })
  );

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
    packages: packagesWithStock,
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

  // Attach live stock counts for Admin Modal
  const packagesWithStock = await Promise.all(
    packages.map(async (pkg) => {
      const availableStock = await Lead.countDocuments({
        package: pkg._id,
        status: "AVAILABLE",
      });
      return {
        ...pkg.toObject(),
        stock: availableStock,
      };
    })
  );

  res.status(200).json({
    success: true,
    packages: packagesWithStock,
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

  // Sync counters in case platform was reassigned or modified
  await syncPlatformLeadCounters(updatedPackage.platform);

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

  const platformId = pkg.platform;

  // 1. Is card se linked saari leads database se completely delete karo
  await Lead.deleteMany({ package: id });

  // 2. Package document delete karo
  await pkg.deleteOne();

  // 3. Platform counters ko real-time re-sync karo
  await syncPlatformLeadCounters(platformId);

  res.status(200).json({
    success: true,
    message: "Package and all its associated leads deleted successfully",
  });
});

module.exports = {
  createPackage,
  getPackagesByPlatform,
  getAllPackages,
  updatePackage,
  deletePackage,
};