const sendEmail = require("./sendEmail");

const sendOtpEmail = async (email, name, otp) => {
  const html = `
  <div style="max-width: 520px; margin: 0 auto; padding: 30px; font-family: Arial, sans-serif; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px;">
    <h2 style="color: #0f172a; margin-top: 0; font-size: 22px;">Hello ${name || "User"},</h2>
    <p style="color: #475569; font-size: 15px; line-height: 1.5; margin-bottom: 24px;">
      Aapke account ka Password Reset request mila hai. Verification OTP neeche diya gaya hai:
    </p>

    <div style="background-color: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 12px; padding: 20px; text-align: center; margin: 24px 0;">
      <span style="font-size: 32px; font-weight: 800; letter-spacing: 8px; color: #1f6b5b; display: inline-block;">
        ${otp}
      </span>
    </div>

    <p style="color: #64748b; font-size: 13px; margin-bottom: 6px;">
      Yeh OTP agle <b>10 Minutes</b> tak valid hai. Kripya ise kisi ke sath share na karein.
    </p>
    <p style="color: #94a3b8; font-size: 12px; margin-top: 20px; border-top: 1px solid #f1f5f9; padding-top: 16px;">
      Agar aapne password reset ki request nahi ki thi, toh is email ko ignore karein.
    </p>
  </div>
  `;

  return await sendEmail({
    email,
    subject: `Password Reset OTP - ${otp}`,
    html,
  });
};

module.exports = sendOtpEmail;