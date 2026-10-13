const { Resend } = require("resend");

const sendEmail = async ({ email, subject, html }) => {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error("CRITICAL: RESEND_API_KEY environment variable missing hai!");
    throw new Error("RESEND_API_KEY environment variable is not defined on server");
  }

  const resend = new Resend(apiKey);

  const { data, error } = await resend.emails.send({
    from: "LeadsVero <onboarding@resend.dev>",
    to: [email],
    subject,
    html,
  });

  if (error) {
    console.error("Resend API Error:", error);
    throw new Error(error.message);
  }

  return data;
};

module.exports = sendEmail;