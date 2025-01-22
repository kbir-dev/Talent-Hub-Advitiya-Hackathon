const twilio = require('twilio');
const dotenv = require('dotenv');

dotenv.config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const sendAdminTalentRegisterMessage = async (message) => {
  try {
    const result = await client.messages.create({
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`, // Twilio WhatsApp-enabled number
      to: `whatsapp:${process.env.TWILIO_ADMIN_NUMBER}`, // Admin's WhatsApp number
      body: message, // Message to send
    });

    console.log('WhatsApp message sent:', result.sid);
  } catch (error) {
    console.error('Error sending WhatsApp message:', error.message);
  }
};

module.exports = { sendAdminTalentRegisterMessage };
