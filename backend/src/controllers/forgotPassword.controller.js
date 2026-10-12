const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");
const generateOtp = require("../utils/generateOtp");
const sendOtpEmail = require("../utils/sendOtpEmail");

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required",
    });
  }

  const cleanEmail = email.toLowerCase().trim();
  const user = await User.findOne({ email: cleanEmail });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found with this email",
    });
  }

  // Generate 6-digit OTP
  const otp = typeof generateOtp === "function" ? generateOtp() : Math.floor(100000 + Math.random() * 900000).toString();

  // Save OTP & 10 mins Expiry
  user.resetOtp = String(otp);
  user.resetOtpExpire = Date.now() + 10 * 60 * 1000;

  await user.save({
    validateBeforeSave: false,
  });

  // Send Email with Error Catch
  try {
    await sendOtpEmail(user.email, user.fullName, otp);
  } catch (emailError) {
    console.error("Nodemailer Send Error on live server:", emailError);
    return res.status(500).json({
      success: false,
      message: "Failed to send OTP email. Please verify live server email configuration.",
    });
  }

  res.status(200).json({
    success: true,
    message: "OTP sent successfully",
    email: user.email,
  });
});

module.exports = forgotPassword;