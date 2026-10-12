const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // 587 ke liye false (STARTTLS use hota hai)
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS ? process.env.EMAIL_PASS.replace(/\s+/g, "") : "",
  },
  tls: {
    rejectUnauthorized: false,
    servername: "smtp.gmail.com",
  },
  family: 4, // Force IPv4
  connectionTimeout: 15000,
  greetingTimeout: 15000,
  socketTimeout: 15000,
});

const sendEmail = async ({ email, subject, html }) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("CRITICAL: EMAIL_USER ya EMAIL_PASS environment variables missing hain!");
    throw new Error("Email configuration missing on server");
  }

  return await transporter.sendMail({
    from: `"LeadsVero" <${process.env.EMAIL_USER}>`,
    to: email,
    subject,
    html,
  });
};

module.exports = sendEmail;