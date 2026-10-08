const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");
const generateOtp = require("../utils/generateOtp");
const sendOtpEmail = require("../utils/sendOtpEmail");

const resendOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required",
    });
  }

  const cleanEmail = email.toLowerCase().trim();

  const user = await User.findOne({ email: cleanEmail })
    .select("_id email fullName")
    .lean();

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const otp = generateOtp();
  const resetOtpExpire = new Date(Date.now() + 10 * 60 * 1000);

  await User.updateOne(
    { _id: user._id },
    { $set: { resetOtp: otp, resetOtpExpire } }
  );

  // Background non-blocking execution
  sendOtpEmail(user.email, user.fullName, otp).catch((err) =>
    console.error("Resend OTP Email Error:", err)
  );

  return res.status(200).json({
    success: true,
    message: "OTP sent successfully",
  });
});

module.exports = resendOtp;