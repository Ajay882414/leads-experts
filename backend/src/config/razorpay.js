const Razorpay = require("razorpay");

const key_id = process.env.RAZORPAY_KEY_ID ? process.env.RAZORPAY_KEY_ID.trim() : "";
const key_secret = process.env.RAZORPAY_KEY_SECRET ? process.env.RAZORPAY_KEY_SECRET.trim() : "";

if (!key_id || !key_secret) {
  console.warn("⚠️️ Razorpay keys missing or empty in .env file!");
} else {
  console.log("💳 Razorpay Configured with Key ID:", key_id);
}

const razorpayInstance = new Razorpay({
  key_id,
  key_secret,
});

module.exports = razorpayInstance;