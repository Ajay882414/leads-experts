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

  // Ab request body me package ID aayegi
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

  if (Number(packageExists.availableLeads || 0) < requestedQuantity) {
    return res.status(400).json({
      success: false,
      message: "Not enough leads available in this package",
      availableLeads: packageExists.availableLeads,
      requestedQuantity,
    });
  }

  const pricePerLead = Number(packageExists.pricePerLead || 0);
  const totalAmount = requestedQuantity * pricePerLead;
  const platformId = packageExists.platform._id;

  // =====================================================
  // TRANSACTION
  // =====================================================
  const session = await mongoose.startSession();

  try {
    let createdOrder = null;
    let purchasedLeadIds = [];

    await session.withTransaction(async () => {
      // 1. Fetch available leads specifically belonging to this package
      const availableLeads = await Lead.find({
        package: packageExists._id,
        status: "AVAILABLE",
      })
        .sort({ createdAt: 1 })
        .limit(requestedQuantity)
        .select("_id")
        .session(session);

      if (availableLeads.length < requestedQuantity) {
        throw new Error("NOT_ENOUGH_LEADS");
      }

      purchasedLeadIds = availableLeads.map((lead) => lead._id);

      // 2. Create Order
      const orderDocuments = await Order.create(
        [
          {
            user: userId,
            platform: platformId,
            quantity: requestedQuantity,
            pricePerLead,
            totalAmount,
            status: "Completed",
            purchasedLeads: purchasedLeadIds,
          },
        ],
        { session }
      );

      createdOrder = orderDocuments[0];

      // 3. Mark package leads as SOLD
      const leadUpdate = await Lead.updateMany(
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

      if (leadUpdate.modifiedCount !== requestedQuantity) {
        throw new Error("LEAD_ASSIGNMENT_FAILED");
      }

      // 4. Update Package Counters
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

      // 5. Update Platform Counters
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

      // 6. Create Download Entry for CSV export
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
    });

    await createNotification({
      title: "Package Purchase",
      message: `Purchased ${requestedQuantity} leads from "${packageExists.name}".`,
      type: "Order",
    });

    return res.status(201).json({
      success: true,
      message: "Leads purchased successfully",
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
  } catch (error) {
    if (error.message === "NOT_ENOUGH_LEADS") {
      return res.status(400).json({
        success: false,
        message: "Requested leads are no longer available in this package",
      });
    }

    if (error.message === "LEAD_ASSIGNMENT_FAILED") {
      return res.status(409).json({
        success: false,
        message: "Some leads were already purchased. Please try again.",
      });
    }

    throw error;
  } finally {
    await session.endSession();
  }
});

module.exports = createOrder;