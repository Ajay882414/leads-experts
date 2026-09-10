const Order = require("../../models/Order");
const asyncHandler = require("../../utils/asyncHandler");

const downloadOrderLead = asyncHandler(async (req, res) => {
  const { orderId } = req.params;

  // ==========================================
  // FIND ORDER
  // ==========================================

  const order = await Order.findById(orderId)
    .populate(
      "platform",
      "name slug"
    )
    .populate(
      "purchasedLeads",
      "fullName phone age gender profession source sourceTimestamp"
    );

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found",
    });
  }

  // ==========================================
  // USER OWNERSHIP CHECK
  // ==========================================

  if (
    !order.user ||
    order.user.toString() !== req.user._id.toString()
  ) {
    return res.status(403).json({
      success: false,
      message:
        "You are not allowed to download this order",
    });
  }

  // ==========================================
  // CHECK PURCHASED LEADS
  // ==========================================

  if (
    !order.purchasedLeads ||
    order.purchasedLeads.length === 0
  ) {
    return res.status(404).json({
      success: false,
      message: "No purchased leads found for this order",
    });
  }

  // ==========================================
  // CSV HEADER
  // ==========================================

  const headers = [
    "Full Name",
    "Phone",
    "Age",
    "Gender",
    "Profession",
    "Source",
    "Source Timestamp",
  ];

  // ==========================================
  // CSV ESCAPE FUNCTION
  // ==========================================

  const escapeCsv = (value) => {
    if (
      value === null ||
      value === undefined
    ) {
      return "";
    }

    const stringValue = String(value);

    return `"${stringValue.replace(
      /"/g,
      '""'
    )}"`;
  };

  // ==========================================
  // CSV ROWS
  // ==========================================

  const rows = order.purchasedLeads.map(
    (lead) => {
      return [
        escapeCsv(lead.fullName),
        escapeCsv(lead.phone),
        escapeCsv(lead.age),
        escapeCsv(lead.gender),
        escapeCsv(lead.profession),
        escapeCsv(lead.source),
        escapeCsv(
          lead.sourceTimestamp
            ? new Date(
                lead.sourceTimestamp
              ).toISOString()
            : ""
        ),
      ].join(",");
    }
  );

  // ==========================================
  // CREATE CSV
  // ==========================================

  const csvContent = [
    headers.join(","),
    ...rows,
  ].join("\r\n");

  // ==========================================
  // FILE NAME
  // ==========================================

  const fileName = `order-${order._id}.csv`;

  // ==========================================
  // RESPONSE HEADERS
  // ==========================================

  res.setHeader(
    "Content-Type",
    "text/csv; charset=utf-8"
  );

  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${fileName}"`
  );

  // ==========================================
  // SEND CSV FILE
  // ==========================================

  res.status(200).send(csvContent);
});

module.exports = downloadOrderLead;