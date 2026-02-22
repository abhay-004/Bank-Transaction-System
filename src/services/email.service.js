const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error("Error connecting to email server:", error);
  } else {
    console.log("Email server is ready to send messages");
  }
});

// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Backend Ledger" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

async function sendRegistrationEmail(userEmail, name) {
  const subject = "Welcome to Backend Ledger!";
  const text = `Hello ${name},\n\nWelcome to Backend Ledger! We're thrilled to have you on board.\n\nBackend Ledger is your secure and reliable platform for managing transactions seamlessly.\n\nIf you have any questions or need assistance, feel free to reply to this email.\n\nBest regards,\nThe Backend Ledger Team`;

  const html = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333; background-color: #ffffff; border: 1px solid #e1e4e8; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
      <div style="text-align: center; padding-bottom: 20px; border-bottom: 2px solid #f0f2f5;">
        <h2 style="color: #2c3e50; margin: 0; font-size: 28px; letter-spacing: -0.5px;">Backend Ledger</h2>
      </div>
      <div style="padding: 30px 20px;">
        <h3 style="color: #2c3e50; font-size: 22px; margin-top: 0; font-weight: 600;">Welcome aboard, ${name}!</h3>
        <p style="font-size: 16px; line-height: 1.6; color: #4a5568; margin-bottom: 20px;">
          We are absolutely thrilled to have you join <strong>Backend Ledger</strong>. Your account has been successfully created, and you're all set to start managing your transactions seamlessly and securely.
        </p>
        <p style="font-size: 16px; line-height: 1.6; color: #4a5568; margin-bottom: 30px;">
          Our platform is designed to provide you with a reliable and intuitive experience for all your financial tracking needs.
        </p>
        <div style="text-align: center; margin: 35px 0;">
          <a href="${process.env.CLIENT_URL || "#"}" style="background-color: #3b82f6; color: white; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px; display: inline-block; transition: background-color 0.3s ease;">Go to Your Dashboard</a>
        </div>
        <p style="font-size: 15px; line-height: 1.6; color: #4a5568; margin-bottom: 0;">
          If you have any questions, encounter any issues, or just need a hand getting started, simply reply to this email. We're always here to help!
        </p>
      </div>
      <div style="padding-top: 25px; border-top: 2px solid #f0f2f5; text-align: center;">
        <p style="font-size: 15px; color: #4a5568; margin: 0; line-height: 1.5;">
          Best regards,<br>
          <strong style="color: #2c3e50;">The Backend Ledger Team</strong>
        </p>
      </div>
      <div style="text-align: center; margin-top: 30px; padding-top: 15px;">
        <p style="font-size: 12px; color: #a0aec0; line-height: 1.5;">
          © ${new Date().getFullYear()} Backend Ledger. All rights reserved.<br>
          If you didn't request to create an account, please safely ignore this email.
        </p>
      </div>
    </div>
  `;
  await sendEmail(userEmail, subject, text, html);
}

module.exports = { sendRegistrationEmail };
