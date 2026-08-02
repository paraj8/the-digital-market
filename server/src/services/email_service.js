const axios = require("axios");

const sendEmail = async ({
  to,
  subject,
  html,
}) => {
  try {
    console.log(`📧 Sending email to ${to}`);

    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: process.env.EMAIL_FROM_NAME || "The Digital Market",
          email: process.env.EMAIL_FROM,
        },

        to: [
          {
            email: to,
          },
        ],

        subject,

        htmlContent: html,
      },
      {
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          "api-key": process.env.BREVO_API_KEY,
        },
      }
    );

    console.log("✅ Email Sent");
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error("❌ Brevo Error");

    if (error.response) {
      console.error(error.response.status);
      console.error(error.response.data);
    } else {
      console.error(error.message);
    }

    throw new Error(
      error.response?.data?.message ||
      "Failed to send email"
    );
  }
};

module.exports = sendEmail;