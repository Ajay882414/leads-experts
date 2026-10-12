const nodemailer = require("nodemailer");
const dns = require("dns");

// Custom resolver jo sirf IPv4 return karega
const ipv4Lookup = (hostname, options, callback) => {
  return dns.lookup(hostname, { family: 4 }, callback);
};

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Port 587 ke liye false
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS ? process.env.EMAIL_PASS.replace(/\s+/g, "") : "",
  },
  lookup: ipv4Lookup, // 👈 Force Node.js to strictly resolve IPv4 only
  tls: {
    rejectUnauthorized: false,
  },
  connectionTimeout: 10000,
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