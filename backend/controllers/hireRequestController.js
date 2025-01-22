const { HireRequest } = require('../models/hireRequest.js');

// Get all hire requests with pending status
exports.getPendingHireRequests = async (req, res) => {
  try {
    const pendingRequests = await HireRequest.find({ status: 'pending' })
      .populate({
        path: 'clientId',
        select: 'name email' // Add any other client fields you need
      })
      .populate({
        path: 'talentId',
        select: 'name skills' // Add any other talent fields you need
      })
      .sort({ createdAt: -1 }); // Optional: sort by newest first

    res.status(200).json(pendingRequests);
  } catch (error) {
    console.error('Error fetching pending hire requests:', error);
    res.status(500).json({ error: 'Failed to fetch pending hire requests' });
  }
};