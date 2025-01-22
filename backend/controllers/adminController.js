const { HireRequest } = require('../models/hireRequest');
const { sendHireRequestNotification, sendTalentNotification } = require("../services/email.js");
const { sendAdminTalentRegisterMessage } = require("../services/whatsapp.js");

const updateHireRequestStatus = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { status } = req.body;

    // Validate status
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    // Find and update the request
    const hireRequest = await HireRequest.findById(requestId).populate('clientId talentId');
    if (!hireRequest) {
      return res.status(404).json({ message: 'Hire request not found' });
    }

    hireRequest.status = status;
    await hireRequest.save();
    console.log("Status Updated");

    // Notify client via email
    await sendHireRequestNotification(hireRequest, status);

    // Notify talent via email if approved
    if (status === 'approved') {
      await sendTalentNotification(hireRequest);
    }

    // Notify admin via WhatsApp
    const adminMessage = `Hire request for talent "${hireRequest.talentId.name}" by client "${hireRequest.clientId.name}" has been ${status}.`;
    await sendAdminTalentRegisterMessage(adminMessage);

    res.status(200).json({
      message: `Hire request ${status} successfully.`,
      hireRequest,
    });
  } catch (error) {
    console.error('Error updating hire request status:', error);
    res.status(500).json({ message: 'Error updating hire request status', error });
  }
};

module.exports = { updateHireRequestStatus };
