const nodemailer = require("nodemailer");
const dns = require("dns");

// Node DNS ko force karein IPv4 result pehle dene ke liye
if (dns.setDefaultResultOrder) {
  dns.setDefaultResultOrder("ipv4first");
}

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
    ciphers: "SSLv3",
  },
  connectionTimeout: 20000,
  greetingTimeout: 15000,
  socketTimeout: 20000,
});

const sendEmail = async ({ email, subject, html }) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error("EMAIL_USER ya EMAIL_PASS environment variables missing hain");
  }

  return await transporter.sendMail({
    from: `"LeadsVero" <${process.env.EMAIL_USER}>`,
    to: email,
    subject,
    html,
  });
};

module.exports = sendEmail;