const { TalentRegistration } = require('../models/talentRegistration.js');
const { sendEmail } = require("../services/email.js");

const removeTalent = async (req, res) => {
  try {
    const { talentId } = req.params;

    const deletedTalent = await TalentRegistration.findById(talentId);

    if (!deletedTalent) {
      return res.status(404).json({ message: 'Talent not found' });
    }

    const userMessage = `
Hello ${deletedTalent.name},

We regret to inform you that your profile on Talent Hub did not meet the necessary criteria for approval at this time. As a result, your profile will not be visible to clients on our platform.

If you believe this was a mistake or if you would like feedback on how to improve your application, please feel free to contact our support team for further assistance.

We appreciate your interest in Talent Hub and encourage you to apply again in the future.

Best regards,
- Talent Hub Team`;

    await sendEmail(deletedTalent.email, 'Talent Hub: Profile Approval Rejected', userMessage);

    await TalentRegistration.findByIdAndDelete(talentId);

    res.status(200).json({ message: 'Talent removed successfully' });
  } catch (error) {
    console.error('Error removing talent:', error);
    res.status(500).json({ message: 'Error removing talent', error });
  }
};

module.exports = { removeTalent };
