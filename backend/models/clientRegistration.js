const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  // Talents whose hire requests have been approved by the admin
  hired: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TalentRegistration', // Reference to approved talents
    },
  ],
  // Talents for whom hire requests are sent and pending admin approval
  toHire: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TalentRegistration', // Reference to talents awaiting approval
    },
  ],
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

const Client = mongoose.model('Client', clientSchema);

module.exports = { Client };
