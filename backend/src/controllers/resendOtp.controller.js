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
  const user = await User.findOne({ email: cleanEmail });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const otp =
    typeof generateOtp === "function"
      ? generateOtp()
      : Math.floor(100000 + Math.random() * 900000).toString();

  // Fast direct update
  await User.updateOne(
    { _id: user._id },
    {
      $set: {
        resetOtp: String(otp),
        resetOtpExpire: new Date(Date.now() + 10 * 60 * 1000),
      },
    }
  );

  try {
    await sendOtpEmail(user.email, user.fullName, otp);
  } catch (emailError) {
    console.error("Resend OTP Email Error:", emailError);
    return res.status(500).json({
      success: false,
      message: "Failed to send OTP email. Please try again.",
    });
  }

  res.status(200).json({
    success: true,
    message: "A new OTP has been sent to your email",
  });
});

module.exports = resendOtp;