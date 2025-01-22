const { TalentRegistration }= require('../models/talentRegistration.js');
const { sendEmail } = require("../services/email.js")

const approveTalent = async (req, res) => {
    try {
      const { talentId } = req.params;
  
      console.log(talentId)
      const updatedTalent = await TalentRegistration.findByIdAndUpdate(
        talentId,
        { approvalStatus: 'approved' },
        { new: true } 
      );
  
      if (!updatedTalent) {
        return res.status(404).json({ message: 'Talent not found' });
      }

      const userMessage = `Hello ${updatedTalent.name},\n\nCongratulations! Your profile has been approved by the admin and is now visible to clients on the Talent Hub. Start showcasing your skills and connecting with potential clients.\n\n- Talent Hub Team`;
      await sendEmail(updatedTalent.email, 'Talent Approval Successful', userMessage);

      res.status(200).json({ message: 'Talent approved successfully', talent: updatedTalent });
    } catch (error) {
      console.error('Error approving talent:', error);
      res.status(500).json({ message: 'Error approving talent', error });
    }
  };

  module.exports = { approveTalent };