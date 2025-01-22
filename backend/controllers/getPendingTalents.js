const { TalentRegistration  } = require('../models/talentRegistration.js');

const getPendingTalents = async (req, res) => {
    try {
      const pendingTalents = await TalentRegistration.find({ approvalStatus: 'pending' });
      res.status(200).json({ message: 'Pending talents fetched successfully', talents: pendingTalents });
    } catch (error) {
      console.error('Error fetching pending talents:', error);
      res.status(500).json({ message: 'Error fetching pending talents', error });
    }
  };
  
module.exports = { getPendingTalents };

