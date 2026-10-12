const nodemailer = require("nodemailer");

const sendEmail = async ({ email, subject, html }) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error("Email configuration missing on server");
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS.replace(/\s+/g, ""),
    },
    family: 4, // 👈 Force IPv4
    tls: {
      rejectUnauthorized: false,
    },
    connectionTimeout: 15000,
  });

  return await transporter.sendMail({
    from: `"LeadsVero" <${process.env.EMAIL_USER}>`,
    to: email,
    subject,
    html,
  });
};

module.exports = sendEmail;