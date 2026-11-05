const { Resend } = require("resend");

const sendEmail = async ({ email, subject, html }) => {
  const apiKey = (process.env.RESEND_API_KEY || "").trim();

  if (!apiKey) {
    console.error("❌ CRITICAL: RESEND_API_KEY missing on server environment!");
    throw new Error("RESEND_API_KEY is not defined on server");
  }

  const resend = new Resend(apiKey);

  console.log("📨 Attempting to dispatch email to:", email);

  const { data, error } = await resend.emails.send({
    from: "LeadsVero <onboarding@resend.dev>",
    to: [email],
    subject: subject,
    html: html,
  });

  if (error) {
    console.error("❌ Resend API Live Rejection:", error);
    throw new Error(error.message || "Failed to deliver email via Resend");
  }

  console.log("✅ Email successfully delivered via Resend. ID:", data?.id);
  return data;
};

module.exports = sendEmail;