const express = require("express");
const router = express.Router();
const {
  createPaymentOrder,
  verifyPayment,
  getAllPayments,
} = require("../controllers/payment/payment.controller");

const protect = require("../middlewares/auth.middleware");
const admin = require("../middlewares/admin.middleware");

// User routes (Order creation & Signature verification)
router.post("/create-order", protect, createPaymentOrder);
router.post("/verify-payment", protect, verifyPayment);

// Admin route
router.get("/all", protect, admin, getAllPayments);

module.exports = router;