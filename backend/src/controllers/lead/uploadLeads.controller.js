const Lead = require("../../models/Lead");
const Platform = require("../../models/Platform");
const Package = require("../../models/Package");
const Order = require("../../models/Order");
const Download = require("../../models/Download");
const asyncHandler = require("../../utils/asyncHandler");
const parseFile = require("../../utils/csvParser");
const createNotification = require("../../utils/createNotification");

// Helper: Auto-assign newly uploaded leads to FIFO pending orders
async function autoAssignPendingOrders(packageId, platformId) {
  try {
    const pendingOrders = await Order.find({
      package: packageId,
      status: "Pending",
    }).sort({ createdAt: 1 });

    for (const order of pendingOrders) {
      const neededCount = order.quantity;

      const availableLeads = await Lead.find({
        package: packageId,
        status: "AVAILABLE",
      }).limit(neededCount);

      if (availableLeads.length >= neededCount) {
        const leadIds = availableLeads.map((l) => l._id);

        // 1. Leads status mark sold
        await Lead.updateMany(
          { _id: { $in: leadIds } },
          {
            $set: {
              status: "SOLD",
              soldTo: order.user,
              soldAt: new Date(),
              order: order._id,
              soldPrice: order.pricePerLead,
            },
          }
        );

        // 2. Order status Completed
        order.status = "Completed";
        order.purchasedLeads = leadIds;
        await order.save();

        // 3. Download record create
        await Download.findOneAndUpdate(
          { order: order._id },
          {
            user: order.user,
            platform: platformId,
            order: order._id,
            totalLeads: order.quantity,
            fileName: `order-${order._id}.csv`,
          },
          { upsert: true, new: true }
        );

        // 4. Update Package sold count
        await Package.findByIdAndUpdate(packageId, {
          $inc: { soldLeads: order.quantity },
        });

        // 5. User Notification
        await createNotification({
          user: order.user,
          title: "Leads Assigned!",
          message: `Aapke order #${String(order._id).slice(-6).toUpperCase()} ki ${order.quantity} leads ready hain. Downloads tab se CSV download karein.`,
          type: "Order",
        });
      }
    }
  } catch (err) {
    console.error("Auto assign pending orders error:", err);
  }
}

const uploadLeads = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Please upload a CSV file",
    });
  }

  const { packageId } = req.body;
  if (!packageId) {
    return res.status(400).json({
      success: false,
      message: "Package card selection is required",
    });
  }

  const packageExists = await Package.findById(packageId).populate("platform");
  if (!packageExists) {
    return res.status(404).json({
      success: false,
      message: "Selected package card not found",
    });
  }

  if (packageExists.status !== "ACTIVE") {
    return res.status(400).json({
      success: false,
      message: "Cannot upload leads to an inactive package",
    });
  }

  const platformId = packageExists.platform._id;
  const rows = parseFile(req.file.buffer);

  if (!rows.length) {
    return res.status(400).json({
      success: false,
      message: "CSV file is empty",
    });
  }

  const firstRow = rows[0];
  const requiredHeaders = ["Name", "Phone", "Age"];
  const missingHeaders = requiredHeaders.filter(
    (header) => !Object.prototype.hasOwnProperty.call(firstRow, header)
  );

  if (missingHeaders.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid CSV format",
      missingHeaders,
      expectedHeaders: [
        "Timestamp",
        "Name",
        "Phone",
        "Age",
        "Gender",
        "Profession",
        "Source",
      ],
    });
  }

  const rawPhoneList = rows
    .map((row) => String(row.Phone || "").replace(/[^0-9+]/g, "").trim())
    .filter(Boolean);

  const existingLeads = await Lead.find({
    package: packageExists._id,
    phone: { $in: rawPhoneList },
  }).select("phone");

  const existingPhones = new Set(existingLeads.map((lead) => lead.phone));
  const csvPhones = new Set();
  const leadsToInsert = [];

  let duplicateCount = 0;
  let invalidCount = 0;

  for (const row of rows) {
    const fullName = String(row.Name || "").trim();
    // Phone numbers ke beech ke extra space/symbols clean karein (e.g. "63768 81458" -> "6376881458")
    const phone = String(row.Phone || "").replace(/[^0-9+]/g, "").trim();
    const ageValue = String(row.Age || "").trim();
    const gender = String(row.Gender || "").trim();
    const profession = String(row.Profession || "").trim();
    const source = String(row.Source || "").trim();

    // Basic validity check
    if (!fullName || !phone || !ageValue) {
      invalidCount++;
      continue;
    }

    if (existingPhones.has(phone) || csvPhones.has(phone)) {
      duplicateCount++;
      continue;
    }

    csvPhones.add(phone);

    let sourceTimestamp = null;
    if (row.Timestamp) {
      const parsedDate = new Date(row.Timestamp);
      if (!Number.isNaN(parsedDate.getTime())) {
        sourceTimestamp = parsedDate;
      }
    }

    leadsToInsert.push({
      platform: platformId,
      package: packageExists._id,
      fullName,
      phone,
      age: ageValue, // Direct string save karega (18, 19, 18-27, 19-37 sab chalega)
      gender,
      profession,
      source,
      sourceTimestamp,
      status: "AVAILABLE",
      soldTo: null,
      soldAt: null,
      order: null,
      soldPrice: null,
    });
  }

  if (!leadsToInsert.length) {
    return res.status(400).json({
      success: false,
      message: "No valid new leads found in CSV",
      inserted: 0,
      duplicates: duplicateCount,
      invalid: invalidCount,
      totalRows: rows.length,
    });
  }

  let insertedLeads = [];
  try {
    insertedLeads = await Lead.insertMany(leadsToInsert, { ordered: false });
  } catch (error) {
    if (error.writeErrors && error.result) {
      insertedLeads = error.result.insertedDocs || [];
    } else {
      throw error;
    }
  }

  const insertedCount = insertedLeads.length;

  if (insertedCount > 0) {
    // 1. Pending orders ko FIFO logic se turant assign karein
    await autoAssignPendingOrders(packageExists._id, platformId);

    // 2. Real-time available stock count sync karein
    const remainingAvailable = await Lead.countDocuments({
      package: packageExists._id,
      status: "AVAILABLE",
    });

    await Package.findByIdAndUpdate(packageExists._id, {
      availableLeads: remainingAvailable,
      $inc: { totalLeads: insertedCount },
    });

    const platformAvailable = await Lead.countDocuments({
      platform: platformId,
      status: "AVAILABLE",
    });

    await Platform.findByIdAndUpdate(platformId, {
      availableLeads: platformAvailable,
      $inc: { totalLeads: insertedCount },
    });

    await createNotification({
      title: "Package Leads Uploaded",
      message: `${insertedCount} leads processed for package "${packageExists.name}".`,
      type: "Lead",
    });
  }

  res.status(201).json({
    success: true,
    message: "Leads uploaded and pending orders processed successfully",
    package: {
      id: packageExists._id,
      name: packageExists.name,
      platform: packageExists.platform.name,
    },
    inserted: insertedCount,
    duplicates: duplicateCount,
    invalid: invalidCount,
    totalRows: rows.length,
  });
});

module.exports = uploadLeads;