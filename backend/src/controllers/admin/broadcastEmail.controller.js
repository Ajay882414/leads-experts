const User = require("../../models/User");
const axios = require("axios");
const asyncHandler = require("../../utils/asyncHandler");

const sendBroadcastEmail = asyncHandler(async (req, res) => {
  const { subject, message, sendMode = "bulk", singleEmail, audience = "all" } = req.body;

  // Render environment se Brevo Key aur Sender uthana
  const apiKey = (process.env.BREVO_PASS || process.env.BREVO_API_KEY || "").trim();
  const senderEmail = (process.env.BREVO_SENDER || process.env.EMAIL_USER || "www.ajaysharma47@gmail.com").trim();

  if (!apiKey) {
    return res.status(500).json({
      success: false,
      message: "BREVO API key environment variables mein missing hai.",
    });
  }

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
    emailList = [{ email: singleEmail.trim().toLowerCase() }];
  } else {
    // Bulk Users Filter
    let query = { role: "user", status: "ACTIVE" };
    if (audience === "verified") {
      query.isVerified = true;
    }

    const users = await User.find(query).select("email fullName").lean();
    if (!users || users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Koi valid active user nahi mila.",
      });
    }
    emailList = users.map((u) => ({ email: u.email, name: u.fullName || "User" }));
  }

  // HTML Template
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1e293b; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px;">
      <div style="border-bottom: 2px solid #10b981; padding-bottom: 12px; margin-bottom: 20px;">
        <h2 style="color: #0c4731; margin: 0; font-size: 22px;">LeadsVero</h2>
      </div>
      <div style="font-size: 15px; line-height: 1.7; color: #334155; white-space: pre-wrap;">
        ${message}
      </div>
      <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 30px 0 15px;" />
      <p style="font-size: 12px; color: #94a3b8; text-align: center; margin: 0;">
        © ${new Date().getFullYear()} LeadsVero. All rights reserved.
      </p>
    </div>
  `;

  try {
    // Brevo HTTPS API Request (Port 443 - Render par kabhi timeout nahi hota)
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: { name: "LeadsVero", email: senderEmail },
        to: emailList,
        subject: subject,
        htmlContent: htmlContent,
      },
      {
        headers: {
          "api-key": apiKey,
          "Content-Type": "application/json",
          accept: "application/json",
        },
        timeout: 10000,
      }
    );

    console.log("✅ Brevo API Success:", response.data);

    return res.status(200).json({
      success: true,
      message: `Email successfully ${emailList.length} recipient(s) ko send ho gaya!`,
      sentCount: emailList.length,
    });
  } catch (error) {
    console.error("❌ Brevo API Error:", error.response?.data || error.message);
    return res.status(500).json({
      success: false,
      message: error.response?.data?.message || "Email send failed via Brevo API.",
    });
  }
});

module.exports = sendBroadcastEmail;