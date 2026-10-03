const mongoose = require("mongoose");

const Order = require("../../models/Order");
const Package = require("../../models/Package");
const Platform = require("../../models/Platform");
const Lead = require("../../models/Lead");
const Download = require("../../models/Download");

const asyncHandler = require("../../utils/asyncHandler");
const createNotification = require("../../utils/createNotification");

const createOrder = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { packageId, quantity } = req.body;
  const requestedQuantity = Number(quantity);

  if (!packageId) {
    return res.status(400).json({
      success: false,
      message: "Package ID is required",
    });
  }

  if (!Number.isInteger(requestedQuantity) || requestedQuantity < 1) {
    return res.status(400).json({
      success: false,
      message: "Quantity must be greater than 0",
    });
  }

  // =====================================================
  // PACKAGE CHECK
  // =====================================================
  const packageExists = await Package.findById(packageId).populate("platform");

  if (!packageExists) {
    return res.status(404).json({
      success: false,
      message: "Package card not found",
    });
  }

  if (packageExists.status !== "ACTIVE") {
    return res.status(400).json({
      success: false,
      message: "This package card is currently inactive",
    });
  }

  const pricePerLead = Number(packageExists.pricePerLead || 0);
  const totalAmount = requestedQuantity * pricePerLead;
  const platformId = packageExists.platform._id;

  const session = await mongoose.startSession();

  try {
    let createdOrder = null;
    let purchasedLeadIds = [];

    await session.withTransaction(async () => {
      // 1. Check if leads exist right now
      const availableLeads = await Lead.find({
        package: packageExists._id,
        status: "AVAILABLE",
      })
        .sort({ createdAt: 1 })
        .limit(requestedQuantity)
        .select("_id")
        .session(session);

      const hasSufficientStock = availableLeads.length >= requestedQuantity;

      if (hasSufficientStock) {
        purchasedLeadIds = availableLeads.map((lead) => lead._id);
      }

      // 2. Create Order with PACKAGE link
      const orderDocuments = await Order.create(
        [
          {
            user: userId,
            platform: platformId,
            package: packageExists._id, // <-- Exact card title & category link
            quantity: requestedQuantity,
            pricePerLead,
            totalAmount,
            status: hasSufficientStock ? "Completed" : "Pending",
            purchasedLeads: purchasedLeadIds,
          },
        ],
        { session }
      );

      createdOrder = orderDocuments[0];

      // 3. If stock was available, assign leads and create download file
      if (hasSufficientStock) {
        await Lead.updateMany(
          {
            _id: { $in: purchasedLeadIds },
            status: "AVAILABLE",
          },
          {
            $set: {
              status: "SOLD",
              soldTo: userId,
              soldAt: new Date(),
              order: createdOrder._id,
              soldPrice: pricePerLead,
            },
          },
          { session }
        );

        await Package.updateOne(
          {
            _id: packageExists._id,
            availableLeads: { $gte: requestedQuantity },
          },
          {
            $inc: {
              availableLeads: -requestedQuantity,
              soldLeads: requestedQuantity,
            },
          },
          { session }
        );

        await Platform.updateOne(
          { _id: platformId },
          {
            $inc: {
              availableLeads: -requestedQuantity,
              soldLeads: requestedQuantity,
            },
          },
          { session }
        );

        await Download.create(
          [
            {
              user: userId,
              order: createdOrder._id,
              platform: platformId,
              totalLeads: requestedQuantity,
              fileName: `${packageExists.name.toLowerCase().replace(/\s+/g, "-")}-${createdOrder._id}.csv`,
            },
          ],
          { session }
        );
      }
    });

    await createNotification({
      title: "Package Purchase",
      message: `Purchased ${requestedQuantity} leads from "${packageExists.name}".`,
      type: "Order",
    });

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: createdOrder,
      purchasedLeads: purchasedLeadIds.length,
      totalAmount,
      package: {
        id: packageExists._id,
        name: packageExists.name,
      },
      platform: {
        id: platformId,
        name: packageExists.platform.name,
      },
    });
  } finally {
    await session.endSession();
  }
});

module.exports = createOrder;