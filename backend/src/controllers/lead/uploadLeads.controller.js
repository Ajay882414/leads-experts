const Lead = require("../../models/Lead");
const Platform = require("../../models/Platform");
const asyncHandler = require("../../utils/asyncHandler");
const parseFile = require("../../utils/csvParser");
const createNotification = require("../../utils/createNotification");



const uploadLeads = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Please upload CSV or Excel file",
    });
  }

  const {
    platform,
  } = req.body;

  const platformExists =
    await Platform.findById(platform);

  if (!platformExists) {
    return res.status(404).json({
      success: false,
      message: "Platform not found",
    });
  }

  const rows = parseFile(
    req.file.buffer
  );

  const leads = [];

  let duplicate = 0;

  for (const row of rows) {
    const email =
  row.Email ||
  row.email ||
  row["Email Address"] ||
  "";

const phone =
  row.Phone ||
  row.phone ||
  row.Mobile ||
  row.mobile ||
  row["Phone Number"] ||
  "";

    if (!email || !phone) {
      continue;
    }

    const exists =
      await Lead.findOne({
        $or: [
          { email },
          { phone },
        ],
      });

    if (exists) {
      duplicate++;
      continue;
    }

    leads.push({
      platform,

      fullName:
  row["Full Name"] ||
  row.fullName ||
  row.Name ||
  row.name ||
  "",

      email,

      phone,

      country:
        row.Country ||
        "",

      state:
        row.State ||
        "",

      city:
        row.City ||
        "",

      business:
        row.Business ||
        "",

      category:
        row.Category ||
        "",

      price:
        row.Price || 0,
    });
  }

  if (leads.length) {
    await Lead.insertMany(leads);

    platformExists.totalLeads +=
      leads.length;

    platformExists.availableLeads +=
      leads.length;

    await platformExists.save();

    await createNotification({
  title: "Leads Uploaded",

  message: `${leads.length} new leads uploaded to ${platformExists.name}.`,

  type: "Lead",
});
  }

  res.json({
    success: true,

    message:
      "Leads uploaded successfully",

    inserted: leads.length,

    duplicates: duplicate,

    totalRows: rows.length,
  });
});

module.exports = uploadLeads;