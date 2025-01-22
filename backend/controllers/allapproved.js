const { TalentRegistration } = require('../models/talentRegistration.js');

const getAllApprovedTalents = async (req, res) => {
  try {
    const approvedTalents = await TalentRegistration.find({ approvalStatus: "approved" });

    if (!approvedTalents || approvedTalents.length === 0) {
      return res.status(200).json({ message: "No talents approved yet." });
    }

    res.status(200).json({
      message: "Approved talents retrieved successfully",
      talents: approvedTalents,
    });
  } catch (error) {
    console.error("Error fetching approved talents:", error);
    res.status(500).json({ message: "Error fetching approved talents", error });
  }
};

module.exports = { getAllApprovedTalents };
