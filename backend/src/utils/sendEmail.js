const sendEmail = async ({ email, subject, html }) => {
  if (!email) {
    throw new Error("Recipient email address is required.");
  }

  // Render environment se Brevo API Key
  const apiKey = (
    process.env.BREVO_PASS ||
    process.env.BREVO_API_KEY ||
    ""
  ).trim();

  const senderEmail = (
    process.env.BREVO_SENDER ||
    process.env.EMAIL_USER ||
    "info@leadsvero.com"
  ).trim();

  if (!apiKey) {
    console.error("❌ CRITICAL: Brevo key missing in environment variables!");
    throw new Error("Brevo key is missing in environment variables.");
  }

  console.log("📨 Dispatching OTP email via Brevo HTTPS API to:", email);

  // HTTPS Port 443 Call (Kabhi timeout ya block nahi hota)
  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": apiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      sender: {
        name: "LeadsVero",
        email: senderEmail,
      },
      to: [
        {
          email: email.trim().toLowerCase(),
        },
      ],
      subject: subject,
      htmlContent: html,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("❌ Brevo Dispatch Error:", data);
    throw new Error(data.message || "Failed to deliver email via Brevo API");
  }

  console.log("✅ OTP Email delivered successfully! MessageId:", data.messageId);
  return data;
};

module.exports = sendEmail;