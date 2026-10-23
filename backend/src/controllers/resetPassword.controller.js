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
  const user = await User.findOne({
    email: cleanEmail,
  }).select("+password");

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  if (String(user.resetOtp).trim() !== String(otp).trim()) {
    return res.status(400).json({
      success: false,
      message: "Invalid OTP",
    });
  }

  if (!user.resetOtpExpire || new Date(user.resetOtpExpire).getTime() < Date.now()) {
    return res.status(400).json({
      success: false,
      message: "OTP Expired. Please request a new one.",
    });
  }

  // Pre-save password hashing hook chalane ke liye direct assignment
  user.password = password;
  user.resetOtp = undefined;
  user.resetOtpExpire = undefined;

  await user.save();

  return res.status(200).json({
    success: true,
    message: "Password reset successfully. You can now login.",
  });
});

module.exports = resetPassword;