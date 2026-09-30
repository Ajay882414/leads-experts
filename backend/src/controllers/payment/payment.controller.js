const crypto = require("crypto");
const mongoose = require("mongoose");
const razorpay = require("../../config/razorpay");
const Payment = require("../../models/Payment");
const Package = require("../../models/Package");
const Lead = require("../../models/Lead");
const Order = require("../../models/Order");
const Download = require("../../models/Download");
const asyncHandler = require("../../utils/asyncHandler");

// 1. CREATE RAZORPAY ORDER
const createPaymentOrder = asyncHandler(async (req, res) => {
  const { packageId, quantity } = req.body;
  const userId = req.user._id;

  if (!packageId || !quantity || quantity < 1) {
    return res.status(400).json({
      success: false,
      message: "Valid packageId and quantity are required",
    });
  }

  const pkg = await Package.findById(packageId);
  if (!pkg) {
    return res.status(404).json({ success: false, message: "Package not found" });
  }

  // Stock check
  const availableStock = await Lead.countDocuments({
    package: new mongoose.Types.ObjectId(packageId),
    status: "AVAILABLE",
  });

  if (availableStock < quantity) {
    return res.status(400).json({
      success: false,
      message: `Sirf ${availableStock} leads bachi hain is package me.`,
    });
  }

  const totalAmountInRupees = pkg.pricePerLead * quantity;
  const amountInPaise = Math.round(totalAmountInRupees * 100);

  if (amountInPaise < 100) {
    return res.status(400).json({
      success: false,
      message: "Amount kam se kam 100 paise hona chahiye",
    });
  }

  const options = {
    amount: amountInPaise,
    currency: "INR",
    receipt: `rcpt_${Date.now()}_${String(userId).slice(-4)}`,
  };

  let razorpayOrder;
  try {
    razorpayOrder = await razorpay.orders.create(options);
  } catch (rzpErr) {
    console.error("❌ Razorpay Order Create Error:", rzpErr);
    return res.status(500).json({
      success: false,
      message: rzpErr?.error?.description || "Razorpay order creation fail ho gaya.",
    });
  }

  await Payment.create({
    user: userId,
    platform: pkg.platform,
    package: pkg._id,
    razorpayOrderId: razorpayOrder.id,
    amount: totalAmountInRupees,
    quantity,
    status: "PENDING",
  });

  res.status(200).json({
    success: true,
    orderId: razorpayOrder.id,
    amount: razorpayOrder.amount,
    currency: razorpayOrder.currency,
    keyId: process.env.RAZORPAY_KEY_ID?.trim(),
    package: {
      name: pkg.name,
      category: pkg.category,
      pricePerLead: pkg.pricePerLead,
    },
  });
});

// 2. VERIFY PAYMENT SIGNATURE & ALLOCATE LEADS
const verifyPayment = asyncHandler(async (req, res) => {
  const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;
  const userId = req.user._id;

  if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
    return res.status(400).json({
      success: false,
      message: "Payment parameters missing hain",
    });
  }

  const secret = process.env.RAZORPAY_KEY_SECRET?.trim() || "";
  const generatedSignature = crypto
    .createHmac("sha256", secret)
    .update(`${razorpayOrderId}|${razorpayPaymentId}`)
    .digest("hex");

  if (generatedSignature !== razorpaySignature) {
    await Payment.findOneAndUpdate(
      { razorpayOrderId },
      { status: "FAILED", razorpayPaymentId, razorpaySignature }
    );
    return res.status(400).json({
      success: false,
      message: "Payment signature mismatch!",
    });
  }

  const payment = await Payment.findOne({ razorpayOrderId });
  if (!payment) {
    return res.status(404).json({ success: false, message: "Payment order nahi mila" });
  }

  // 1. Available Leads fetch karein
  const leadsToAssign = await Lead.find({
    package: payment.package,
    status: "AVAILABLE",
  }).limit(payment.quantity);

  if (leadsToAssign.length < payment.quantity) {
    return res.status(400).json({
      success: false,
      message: "Leads stock khatam ho chuka hai.",
    });
  }

  const leadIds = leadsToAssign.map((lead) => lead._id);
  const pricePerLead = payment.amount / payment.quantity;

  // 2. New Order create karein with exact Enum "Completed"
  const newOrder = await Order.create({
    user: userId,
    platform: payment.platform,
    quantity: payment.quantity,
    pricePerLead: pricePerLead,
    totalAmount: payment.amount,
    status: "Completed",
    purchasedLeads: leadIds,
  });

  // 3. Leads ko update karein (Lead model ke fields: status SOLD, soldTo, soldAt, order)
  await Lead.updateMany(
    { _id: { $in: leadIds } },
    {
      $set: {
        status: "SOLD",
        soldTo: userId,
        soldAt: new Date(),
        order: newOrder._id,
        soldPrice: pricePerLead,
      },
    }
  );

  // 4. Download record create karein (totalLeads required field added)
  try {
    await Download.create({
      user: userId,
      platform: payment.platform,
      order: newOrder._id,
      totalLeads: payment.quantity,
      fileName: `order-${newOrder._id}.csv`,
    });
  } catch (dlErr) {
    console.warn("Download record insert note:", dlErr.message);
  }

  // 5. Package stock count sync karein
  const remainingStock = await Lead.countDocuments({
    package: payment.package,
    status: "AVAILABLE",
  });

  await Package.findByIdAndUpdate(payment.package, {
    availableLeads: remainingStock,
    $inc: { soldLeads: payment.quantity },
  });

  // 6. Payment status SUCCESS update karein
  payment.status = "SUCCESS";
  payment.razorpayPaymentId = razorpayPaymentId;
  payment.razorpaySignature = razorpaySignature;
  payment.order = newOrder._id;
  await payment.save();

  res.status(200).json({
    success: true,
    message: "Payment verify ho gaya aur leads assign ho gayi!",
    orderId: newOrder._id,
  });
});

// 3. ADMIN: GET ALL PAYMENTS
const getAllPayments = asyncHandler(async (req, res) => {
  const payments = await Payment.find()
    .populate("user", "fullName email mobileNumber")
    .populate("platform", "name")
    .populate("package", "name category")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: payments.length,
    payments,
  });
});

module.exports = {
  createPaymentOrder,
  verifyPayment,
  getAllPayments,
};