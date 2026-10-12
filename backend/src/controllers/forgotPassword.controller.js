const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");
const generateOtp = require("../utils/generateOtp");
// Agar aapke helper ka naam sendEmail hai toh utils/sendEmail require karein, warna utils/sendOtpEmail
const sendEmail = require("../utils/sendEmail");

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required",
    });
  }

  const cleanEmail = email.toLowerCase().trim();

  // User search karein
  const user = await User.findOne({ email: cleanEmail });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "No user found with this email address",
    });
  }

  // 6-digit OTP generate karein
  const otp = generateOtp ? generateOtp() : Math.floor(100000 + Math.random() * 900000).toString();
  const resetOtpExpire = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes validity

  // Database me OTP aur Expiry save karein
  user.resetOtp = String(otp);
  user.resetOtpExpire = resetOtpExpire;
  await user.save({ validateBeforeSave: false });

  // Email HTML Template
  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded: 10px;">
      <h2 style="color: #1f6b5b; text-align: center; margin-bottom: 20px;">LeadsVero Password Reset</h2>
      <p style="font-size: 15px; color: #334155;">Hello <strong>${user.fullName || "User"}</strong>,</p>
      <p style="font-size: 14px; color: #475569; line-height: 1.5;">
        Aapne password reset karne ke liye request bheji hai. Aapka Password Reset OTP neeche diya gaya hai:
      </p>
      <div style="text-align: center; margin: 25px 0;">
        <span style="display: inline-block; font-size: 28px; font-weight: bold; letter-spacing: 6px; color: #0f172a; background-color: #f1f5f9; padding: 12px 24px; border-radius: 8px; border: 1px dashed #cbd5e1;">
          ${otp}
        </span>
      </div>
      <p style="font-size: 13px; color: #64748b; line-height: 1.4;">
        Yeh OTP agle <strong>10 minutes</strong> ke liye valid hai. Kripya ise kisi ke sath share na karein.
      </p>
      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
      <p style="font-size: 11px; color: #94a3b8; text-align: center;">
        Agar aapne yeh request nahi ki thi, toh is email ko ignore karein.
      </p>
    </div>
  `;

  // Email bhejein (await ke sath taaki koi error ho toh pakad sake)
  try {
    await sendEmail({
      email: user.email,
      subject: `Password Reset OTP - ${otp}`,
      html: emailHtml,
    });
  } catch (emailErr) {
    console.error("Nodemailer Email Error:", emailErr);
    return res.status(500).json({
      success: false,
      message: "Failed to send OTP email. Please check server email configuration.",
    });
  }

  return res.status(200).json({
    success: true,
    message: "OTP sent successfully to your email address",
    email: user.email,
  });
});

module.exports = forgotPassword;