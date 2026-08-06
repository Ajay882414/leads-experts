const nodemailer = require("nodemailer");

const sendOtpEmail = async (
  email,
  name,
  otp
) => {
  const transporter =
    nodemailer.createTransport({
      service: "gmail",

      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

  const html = `
  <div
  style="
  max-width:600px;
  margin:auto;
  padding:40px;
  font-family:Arial;
  ">

  <h2>Hello ${name}</h2>

  <p>
  Your Password Reset OTP
  </p>

  <h1
  style="
  letter-spacing:8px;
  color:#2563eb;
  "
  >
  ${otp}
  </h1>

  <p>
  OTP will expire in
  <b>10 Minutes</b>.
  </p>

  <p>
  Ignore this email if
  you didn't request it.
  </p>

  </div>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,

    to: email,

    subject:
      "Password Reset OTP",

    html,
  });
};

module.exports =
  sendOtpEmail;