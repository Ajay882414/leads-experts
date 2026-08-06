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

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  // Generate OTP
  const otp = generateOtp();

  // Save OTP
  user.resetOtp = otp;
  user.resetOtpExpire = Date.now() + 10 * 60 * 1000;

  await user.save({
    validateBeforeSave: false,
  });

  // Send Email
  await sendOtpEmail(
    user.email,
    user.fullName,
    otp
  );

  res.status(200).json({
    success: true,
    message: "OTP sent successfully",
    email: user.email,
  });
});

module.exports = forgotPassword;