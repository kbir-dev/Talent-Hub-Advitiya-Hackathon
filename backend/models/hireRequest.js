const mongoose = require('mongoose');

const hireRequestSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
  },
  talentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TalentRegistration',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const HireRequest = mongoose.model('HireRequest', hireRequestSchema);
module.exports = { HireRequest };
