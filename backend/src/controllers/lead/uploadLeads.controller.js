const Lead = require("../../models/Lead");
const Platform = require("../../models/Platform");
const Package = require("../../models/Package");
const asyncHandler = require("../../utils/asyncHandler");
const parseFile = require("../../utils/csvParser");
const createNotification = require("../../utils/createNotification");

const uploadLeads = asyncHandler(async (req, res) => {
  // =========================================
  // 1. CHECK FILE
  // =========================================
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Please upload a CSV file",
    });
  }

  // =========================================
  // 2. PACKAGE CHECK
  // =========================================
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

  // =========================================
  // 3. PARSE CSV
  // =========================================
  const rows = parseFile(req.file.buffer);

  if (!rows.length) {
    return res.status(400).json({
      success: false,
      message: "CSV file is empty",
    });
  }

  // =========================================
  // 4. REQUIRED CSV HEADERS
  // =========================================
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

  // =========================================
  // 5. PREPARE PHONE NUMBERS FOR DUPLICATE CHECK
  // =========================================
  const phoneNumbers = rows
    .map((row) => String(row.Phone || "").trim())
    .filter(Boolean);

  // Leads duplicate check inside this specific package card
  const existingLeads = await Lead.find({
    package: packageExists._id,
    phone: { $in: phoneNumbers },
  }).select("phone");

  const existingPhones = new Set(existingLeads.map((lead) => lead.phone));
  const csvPhones = new Set();
  const leadsToInsert = [];

  let duplicateCount = 0;
  let invalidCount = 0;

  // =========================================
  // 6. PROCESS EVERY ROW
  // =========================================
  for (const row of rows) {
    const fullName = String(row.Name || "").trim();
    const phone = String(row.Phone || "").trim();
    const ageValue = String(row.Age || "").trim();
    const gender = String(row.Gender || "").trim();
    const profession = String(row.Profession || "").trim();
    const source = String(row.Source || "").trim();

    if (!fullName || !phone || !ageValue) {
      invalidCount++;
      continue;
    }

    const age = Number(ageValue);
    if (Number.isNaN(age) || age < 0 || age > 120) {
      invalidCount++;
      continue;
    }

    // Check duplicate inside this package
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
      age,
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

  // =========================================
  // 7. BULK INSERT
  // =========================================
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

  // =========================================
  // 8. UPDATE PACKAGE & PLATFORM COUNTERS
  // =========================================
  if (insertedCount > 0) {
    await Package.findByIdAndUpdate(packageExists._id, {
      $inc: {
        totalLeads: insertedCount,
        availableLeads: insertedCount,
      },
    });

    await Platform.findByIdAndUpdate(platformId, {
      $inc: {
        totalLeads: insertedCount,
        availableLeads: insertedCount,
      },
    });

    await createNotification({
      title: "Package Leads Uploaded",
      message: `${insertedCount} leads added to package "${packageExists.name}".`,
      type: "Lead",
    });
  }

  res.status(201).json({
    success: true,
    message: "Leads uploaded to package successfully",
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