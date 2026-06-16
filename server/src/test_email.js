require("dotenv").config();

const sendEmail = require("./services/email_service");

const testEmail = async () => {
  try {
    await sendEmail({
      to: "parajmandal151@gmail.com",
      subject: "The Digital Market Test",
      html: `
        <h1>🚀 Email Working!</h1>
        <p>The Digital Market backend can now send emails.</p>
      `,
    });

    console.log("✅ Email sent successfully");
  } catch (error) {
    console.error("❌ Email failed");
    console.error(error);
  }
};

testEmail();