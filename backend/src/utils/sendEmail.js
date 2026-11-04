const nodemailer = require("nodemailer");

// Brevo SMTP Transporter (Render + Localhost 100% Reliable)
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, // 587 ke liye TLS
  auth: {
    user: (process.env.BREVO_USER || process.env.EMAIL_USER || "").trim(),
    pass: (process.env.BREVO_PASS || process.env.EMAIL_PASS || "").trim(),
  },
  tls: {
    rejectUnauthorized: false,
  },
  connectionTimeout: 15000,
});

const sendEmail = async ({ email, subject, html }) => {
  if (!email) {
    throw new Error("Recipient email address is required.");
  }

  const senderEmail = (
    process.env.BREVO_SENDER ||
    process.env.EMAIL_USER ||
    "info@leadsvero.com"
  ).trim();

  const mailOptions = {
    from: `"LeadsVero" <${senderEmail}>`,
    to: email,
    subject: subject,
    html: html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully via Brevo to:", email);
    return info;
  } catch (error) {
    console.error("❌ Email Send Error:", error.message);
    throw new Error(error.message || "Failed to deliver email.");
  }
};

module.exports = sendEmail;