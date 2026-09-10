const Lead = require("../../models/Lead");
const Platform = require("../../models/Platform");
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
  // 2. PLATFORM
  // =========================================

  const { platform } = req.body;

  if (!platform) {
    return res.status(400).json({
      success: false,
      message: "Platform is required",
    });
  }

  const platformExists = await Platform.findById(platform);

  if (!platformExists) {
    return res.status(404).json({
      success: false,
      message: "Platform not found",
    });
  }

  // =========================================
  // 3. PLATFORM MUST BE ACTIVE
  // =========================================

  if (platformExists.status !== "ACTIVE") {
    return res.status(400).json({
      success: false,
      message: "Cannot upload leads to an inactive platform",
    });
  }

  // =========================================
  // 4. PARSE CSV
  // =========================================

  const rows = parseFile(req.file.buffer);

  if (!rows.length) {
    return res.status(400).json({
      success: false,
      message: "CSV file is empty",
    });
  }

  // =========================================
  // 5. REQUIRED CSV HEADERS
  // =========================================

  const firstRow = rows[0];

  const requiredHeaders = [
    "Name",
    "Phone",
    "Age",
    "Gender",
    "Profession",
    "Source",
  ];

  const missingHeaders = requiredHeaders.filter(
    (header) =>
      !Object.prototype.hasOwnProperty.call(
        firstRow,
        header
      )
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
  // 6. PREPARE PHONE NUMBERS
  // =========================================

  const phoneNumbers = rows
    .map((row) => String(row.Phone || "").trim())
    .filter(Boolean);

  // =========================================
  // 7. FIND EXISTING LEADS
  // =========================================

  const existingLeads = await Lead.find({
    platform: platformExists._id,
    phone: {
      $in: phoneNumbers,
    },
  }).select("phone");

  const existingPhones = new Set(
    existingLeads.map((lead) => lead.phone)
  );

  // =========================================
  // 8. PREVENT DUPLICATES INSIDE SAME CSV
  // =========================================

  const csvPhones = new Set();

  const leadsToInsert = [];

  let duplicateCount = 0;
  let invalidCount = 0;

  // =========================================
  // 9. PROCESS EVERY ROW
  // =========================================

  for (const row of rows) {
    const fullName = String(
      row.Name || ""
    ).trim();

    const phone = String(
      row.Phone || ""
    ).trim();

    const ageValue = String(
      row.Age || ""
    ).trim();

    const gender = String(
      row.Gender || ""
    ).trim();

    const profession = String(
      row.Profession || ""
    ).trim();

    const source = String(
      row.Source || ""
    ).trim();

    // =========================================
    // REQUIRED DATA
    // =========================================

    if (!fullName || !phone || !ageValue) {
      invalidCount++;
      continue;
    }

    const age = Number(ageValue);

    if (
      Number.isNaN(age) ||
      age < 0 ||
      age > 120
    ) {
      invalidCount++;
      continue;
    }

    // =========================================
    // DUPLICATE ALREADY IN DATABASE
    // =========================================

    if (existingPhones.has(phone)) {
      duplicateCount++;
      continue;
    }

    // =========================================
    // DUPLICATE INSIDE CURRENT CSV
    // =========================================

    if (csvPhones.has(phone)) {
      duplicateCount++;
      continue;
    }

    csvPhones.add(phone);

    // =========================================
    // TIMESTAMP
    // =========================================

    let sourceTimestamp = null;

    if (row.Timestamp) {
      const parsedDate = new Date(row.Timestamp);

      if (!Number.isNaN(parsedDate.getTime())) {
        sourceTimestamp = parsedDate;
      }
    }

    // =========================================
    // CREATE LEAD OBJECT
    // =========================================

    leadsToInsert.push({
      platform: platformExists._id,

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

  // =========================================
  // 10. NOTHING TO INSERT
  // =========================================

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
  // 11. INSERT LEADS
  // =========================================

  let insertedLeads = [];

  try {
    insertedLeads = await Lead.insertMany(
      leadsToInsert,
      {
        ordered: false,
      }
    );
  } catch (error) {
    // insertMany with ordered:false can
    // still return successfully inserted docs
    // depending on duplicate errors.

    if (
      error.writeErrors &&
      error.result
    ) {
      insertedLeads =
        error.result.insertedDocs || [];
    } else {
      throw error;
    }
  }

  const insertedCount =
    insertedLeads.length;

  // =========================================
  // 12. UPDATE PLATFORM COUNTERS
  // =========================================

  if (insertedCount > 0) {
    await Platform.findByIdAndUpdate(
      platformExists._id,
      {
        $inc: {
          totalLeads: insertedCount,
          availableLeads: insertedCount,
        },
      },
      {
        new: true,
      }
    );
  }

  // =========================================
  // 13. NOTIFICATION
  // =========================================

  if (insertedCount > 0) {
    await createNotification({
      title: "Leads Uploaded",
      message: `${insertedCount} new leads uploaded to ${platformExists.name}.`,
      type: "Lead",
    });
  }

  // =========================================
  // 14. RESPONSE
  // =========================================

  res.status(201).json({
    success: true,

    message:
      "Leads uploaded successfully",

    platform: {
      id: platformExists._id,
      name: platformExists.name,
    },

    inserted: insertedCount,

    duplicates: duplicateCount,

    invalid: invalidCount,

    totalRows: rows.length,

    availableLeads:
      platformExists.availableLeads +
      insertedCount,

    totalLeads:
      platformExists.totalLeads +
      insertedCount,
  });
});

module.exports = uploadLeads;