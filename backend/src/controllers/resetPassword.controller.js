const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");

const resetPassword = asyncHandler(async (req, res) => {
  const { email, otp, password, confirmPassword } = req.body;

  if (!email || !otp || !password || !confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Passwords do not match",
    });
  }

  const cleanEmail = email.toLowerCase().trim();

  // Sirf OTP validation ke liye fields mangwayein (password load karne ki zaroorat nahi)
  const user = await User.findOne({ email: cleanEmail }).select(
    "resetOtp resetOtpExpire password"
  );

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  if (user.resetOtp !== String(otp).trim()) {
    return res.status(400).json({
      success: false,
      message: "Invalid OTP",
    });
  }

  if (!user.resetOtpExpire || user.resetOtpExpire.getTime() < Date.now()) {
    return res.status(400).json({
      success: false,
      message: "OTP Expired",
    });
  }

  // Password set karke pre-save hook ko hash karne dein
  user.password = password;
  user.resetOtp = undefined;
  user.resetOtpExpire = undefined;

  await user.save();

  return res.status(200).json({
    success: true,
    message: "Password reset successfully",
  });
});

module.exports = resetPassword;