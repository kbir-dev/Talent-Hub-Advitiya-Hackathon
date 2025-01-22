const mongoose = require('mongoose');

const talentRegistrationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    contactNumber: {
      type: Number,
      required: true,
    },
    skills: {
      type: String,
      required: true,
    },
    personalDescription: {
      type: String,
      required: true,
    },
    profilePhoto: {
      type: String, // Cloudinary URL will be stored here
      required: true,
    },
    approvalStatus: {
      type: String,
      enum: ['pending', 'approved', 'rejected'], // Only these values are allowed
      default: 'pending', // Default value is "pending"
    },
  },{timestamps:true})

const TalentRegistration = mongoose.model('TalentRegistration', talentRegistrationSchema);

module.exports = { TalentRegistration }
