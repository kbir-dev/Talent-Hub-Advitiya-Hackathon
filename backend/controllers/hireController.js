const { HireRequest } = require('../models/hireRequest');
const { Client } = require('../models/clientRegistration');
const { TalentRegistration } = require('../models/talentRegistration');
const { sendAdminTalentRegisterMessage } = require('../services/whatsapp.js');

const createHireRequest = async (req, res) => {
  try {
    const { clientId, talentId } = req.body;

    // Validate client and talent existence
    const client = await Client.findById(clientId);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    const talent = await TalentRegistration.findById(talentId);
    if (!talent || talent.approvalStatus !== 'approved') {
      return res.status(404).json({ message: 'Talent not found or not approved' });
    }

    // Create a new hire request
    const hireRequest = new HireRequest({
      clientId,
      talentId,
    });

    await hireRequest.save();

    // Notify admin via WhatsApp // Add admin number in .env
    const message = `New Hire Request:
- Client: ${client.name} (${client.email})
- Talent: ${talent.name} (${talent.email})
- Status: Pending`;

    await sendAdminTalentRegisterMessage(message);

    res.status(201).json({
      message: 'Hire request created successfully and admin notified.',
      hireRequest,
    });
  } catch (error) {
    console.error('Error creating hire request:', error);
    res.status(500).json({ message: 'Error creating hire request', error });
  }
};

module.exports = { createHireRequest };
