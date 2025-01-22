const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'Gmail', 
  auth: {
    user: process.env.EMAIL, 
    pass: process.env.EMAIL_PASSWORD, 
  },
});

const sendEmail = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL, 
      to: to, 
      subject: subject,
      text: text,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${to}`);
  } catch (error) {
    console.error('Error sending email:', error.message);
    throw error;
  }
};

const sendHireRequestNotification = async (hireRequest, status) => {
  try {
    const clientEmail = hireRequest.clientId.email;
    const message = `
      Hello ${hireRequest.clientId.name},

      Your hire request for the talent "${hireRequest.talentId.name}" has been ${status}.

      Thank you for using Talent Hub!
      Best regards,
      Talent Hub Team
    `;

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // Change to your email service provider
      auth: {
        user: process.env.EMAIL, // Your email address
        pass: process.env.EMAIL_PASSWORD, // Your email password or app password
      },
    });

    // Set up email options
    const mailOptions = {
      from: `"Talent Hub" <${process.env.EMAIL}>`,
      to: clientEmail,
      subject: `Talent Hub: Hire Request ${status}`,
      text: message,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    console.log("Hire request notification sent via email successfully.");
  } catch (error) {
    console.error("Error sending hire request notification via email:", error);
  }
};

const sendTalentNotification = async (hireRequest) => {
  const talentEmail = hireRequest.talentId.email;
  const clientName = hireRequest.clientId.name;

  const subject = 'Talent Hub: You have been paired with a client';
  const message = `Hello ${hireRequest.talentId.name},\n\nCongratulations! You have been paired with a client, "${clientName}", on Talent Hub.\n\nThe client has expressed interest in hiring you. Please log in to your dashboard for further details.\n\nBest regards,\nTalent Hub Team`;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: talentEmail,
    subject,
    text: message,
  });
};

module.exports = { sendEmail , sendHireRequestNotification, sendTalentNotification};
