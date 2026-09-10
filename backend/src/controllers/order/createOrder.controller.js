const mongoose = require("mongoose");

const Order = require("../../models/Order");
const Platform = require("../../models/Platform");
const Lead = require("../../models/Lead");
const Download = require("../../models/Download"); // <-- Download model import kiya

const asyncHandler = require("../../utils/asyncHandler");
const createNotification = require("../../utils/createNotification");

const createOrder = asyncHandler(async (req, res) => {
  // =====================================================
  // USER
  // =====================================================
  const userId = req.user._id;

  // =====================================================
  // REQUEST DATA
  // =====================================================
  const { platform, quantity } = req.body;
  const requestedQuantity = Number(quantity);

  if (!platform) {
    return res.status(400).json({
      success: false,
      message: "Platform is required",
    });
  }

  if (!Number.isInteger(requestedQuantity) || requestedQuantity < 1) {
    return res.status(400).json({
      success: false,
      message: "Quantity must be greater than 0",
    });
  }

  // =====================================================
  // PLATFORM CHECK
  // =====================================================
  const platformExists = await Platform.findById(platform);

  if (!platformExists) {
    return res.status(404).json({
      success: false,
      message: "Platform not found",
    });
  }

  if (platformExists.status !== "ACTIVE") {
    return res.status(400).json({
      success: false,
      message: "This platform is currently inactive",
    });
  }

  if (Number(platformExists.availableLeads || 0) < requestedQuantity) {
    return res.status(400).json({
      success: false,
      message: "Not enough leads available",
      availableLeads: platformExists.availableLeads,
      requestedQuantity,
    });
  }

  // =====================================================
  // PRICE CALCULATION
  // =====================================================
  const pricePerLead = Number(platformExists.pricePerLead || 0);
  const totalAmount = requestedQuantity * pricePerLead;

  // =====================================================
  // MONGODB TRANSACTION
  // =====================================================
  const session = await mongoose.startSession();

  try {
    let createdOrder = null;
    let purchasedLeadIds = [];

    await session.withTransaction(async () => {
      // 1. GET AVAILABLE LEADS
      const availableLeads = await Lead.find({
        platform: platformExists._id,
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

      // 2. CREATE ORDER
      const orderDocuments = await Order.create(
        [
          {
            user: userId,
            platform: platformExists._id,
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

      // 3. MARK LEADS AS SOLD
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

      // 4. UPDATE PLATFORM COUNTERS
      await Platform.updateOne(
        {
          _id: platformExists._id,
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

      // 5. CREATE DOWNLOAD ENTRY FOR USER (Directly in Transaction)
      await Download.create(
        [
          {
            user: userId,
            order: createdOrder._id,
            platform: platformExists._id,
            totalLeads: requestedQuantity,
            fileName: `order-${createdOrder._id}.csv`,
          },
        ],
        { session }
      );
    });

    // =====================================================
    // NOTIFICATION
    // =====================================================
    await createNotification({
      title: "New Lead Purchase",
      message: `A user purchased ${requestedQuantity} ${platformExists.name} leads.`,
      type: "Order",
    });

    return res.status(201).json({
      success: true,
      message: "Leads purchased successfully",
      order: createdOrder,
      purchasedLeads: purchasedLeadIds.length,
      totalAmount,
      platform: {
        id: platformExists._id,
        name: platformExists.name,
      },
    });
  } catch (error) {
    if (error.message === "NOT_ENOUGH_LEADS") {
      return res.status(400).json({
        success: false,
        message: "Requested leads are no longer available",
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