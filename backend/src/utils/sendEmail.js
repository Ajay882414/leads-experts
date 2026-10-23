const nodemailer = require("nodemailer");

// Brevo / Live SMTP Transporter (Localhost + Render Cloud Compatible)
const createTransporter = () => {
  const user = (
    process.env.BREVO_USER ||
    process.env.EMAIL_USER ||
    ""
  ).trim();

  const pass = (
    process.env.BREVO_PASS ||
    process.env.EMAIL_PASS ||
    ""
  ).trim();

  if (!user || !pass) {
    throw new Error("BREVO_USER/EMAIL_USER ya BREVO_PASS/EMAIL_PASS credentials missing hain.");
  }

  return nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false, // Port 587 ke liye false (STARTTLS)
    auth: {
      user: user,
      pass: pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
    connectionTimeout: 15000,
  });
};

const sendEmail = async ({ email, subject, html }) => {
  if (!email) {
    throw new Error("Recipient email address is required.");
  }

  const transporter = createTransporter();

  const senderEmail = (
    process.env.BREVO_SENDER ||
    process.env.EMAIL_USER ||
    process.env.BREVO_USER ||
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
    console.log("✅ Email sent successfully to:", email, "MessageID:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ SMTP Dispatch Error:", error.message);
    throw new Error(error.message || "Failed to send email via SMTP.");
  }
};

module.exports = sendEmail;