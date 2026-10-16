const User = require("../../models/User");
const nodemailer = require("nodemailer");
const asyncHandler = require("../../utils/asyncHandler");

// 1. Gmail SMTP Transporter
const createTransporter = () => {
  const user = (process.env.EMAIL_USER || "").trim();
  const pass = (process.env.EMAIL_PASS || "").trim();

  if (!user || !pass) {
    throw new Error("EMAIL_USER ya EMAIL_PASS .env file mein missing hai.");
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: user,
      pass: pass, // 16-character Google App Password
    },
  });
};

const sendBroadcastEmail = asyncHandler(async (req, res) => {
  const { subject, message, sendMode = "bulk", singleEmail, audience = "all" } = req.body;

  if (!subject || !message) {
    return res.status(400).json({
      success: false,
      message: "Subject aur message dono likhna zaroori hai.",
    });
  }

  let emailList = [];

  // Single User Filter
  if (sendMode === "single") {
    if (!singleEmail || !singleEmail.trim()) {
      return res.status(400).json({
        success: false,
        message: "Single user ke liye recipient email likhna zaroori hai.",
      });
    }
    emailList = [singleEmail.trim().toLowerCase()];
  } else {
    // Bulk Users Filter
    let query = { role: "user", status: "ACTIVE" };
    if (audience === "verified") {
      query.isVerified = true;
    }

    const users = await User.find(query).select("email").lean();
    if (!users || users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Koi valid active user nahi mila.",
      });
    }
    emailList = users.map((u) => u.email).filter(Boolean);
  }

  // Professional HTML Template
  const getHtmlContent = (bodyText) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1e293b; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px;">
      <div style="border-bottom: 2px solid #10b981; padding-bottom: 12px; margin-bottom: 20px;">
        <h2 style="color: #0c4731; margin: 0; font-size: 22px;">LeadsVero</h2>
      </div>
      <div style="font-size: 15px; line-height: 1.7; color: #334155; white-space: pre-wrap;">
        ${bodyText}
      </div>
      <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 30px 0 15px;" />
      <p style="font-size: 12px; color: #94a3b8; text-align: center; margin: 0;">
        © ${new Date().getFullYear()} LeadsVero. All rights reserved.
      </p>
    </div>
  `;

  const transporter = createTransporter();
  const senderEmail = (process.env.EMAIL_USER || "").trim();

  // --- 1. SINGLE EMAIL DISPATCH ---
  if (sendMode === "single") {
    try {
      const info = await transporter.sendMail({
        from: `"LeadsVero" <${senderEmail}>`,
        to: emailList[0],
        subject: subject,
        html: getHtmlContent(message),
      });

      console.log("✅ Email Sent Successfully to:", emailList[0], "MessageID:", info.messageId);

      return res.status(200).json({
        success: true,
        message: `Email successfully ${emailList[0]} ko bhej diya gaya hai!`,
        sentCount: 1,
      });
    } catch (err) {
      console.error("❌ Gmail Send Error:", err.message);
      return res.status(500).json({
        success: false,
        message: err.message || "Email send karne mein error aaya.",
      });
    }
  }

  // --- 2. BULK EMAIL DISPATCH ---
  let successfulSends = 0;

  for (const toEmail of emailList) {
    try {
      await transporter.sendMail({
        from: `"LeadsVero" <${senderEmail}>`,
        to: toEmail,
        subject: subject,
        html: getHtmlContent(message),
      });
      successfulSends++;
    } catch (err) {
      console.error(`Failed to send to ${toEmail}:`, err.message);
    }
  }

  return res.status(200).json({
    success: true,
    message: `Broadcast successfully ${successfulSends} users ko bhej diya gaya.`,
    sentCount: successfulSends,
  });
});

module.exports = sendBroadcastEmail;