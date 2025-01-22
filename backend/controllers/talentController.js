const { TalentRegistration  } = require('../models/talentRegistration.js')
const { uploadImageToCloudinary } = require('../services/cloudinary.js')
const { sendAdminTalentRegisterMessage } = require('../services/whatsapp.js')
const { sendEmail } = require("../services/email.js")
const dotenv = require("dotenv")
dotenv.config()

/**
 * Handles talent registration with image upload
 */
const registerTalent = async (req, res) => {
  try {
    // Get the file path from Multer and upload it to Cloudinary
    const localFilePath = req.file.path;
    const cloudinaryResult = await uploadImageToCloudinary(localFilePath, `talent/${req.file.filename}`);

    // Save talent details in MongoDB
    const { name, email, contactNumber, skills, personalDescription } = req.body;
    const newTalent = await TalentRegistration.create({
      name,
      email,
      contactNumber,
      skills,
      personalDescription,
      profilePhoto: cloudinaryResult.secure_url, // Cloudinary URL
    });

    const message = `New Talent Registration:\n\nName: ${name}\nEmail: ${email}\nContact: ${contactNumber}\nSkills: ${skills}\nApproval Required.`;
    await sendAdminTalentRegisterMessage(message);

    const userMessage = `Hello ${name},\n\nYour profile has been successfully registered on the Talent Hub platform and is awaiting admin approval. We will notify you once it gets approved. Stay tuned!`;
    await sendEmail(email, 'Talent Hub Registration Successful', userMessage);

    res.status(201).json({
      message: 'Talent registered successfully, notification sent to admin',
      talent: newTalent,
    });
  } catch (error) {
    console.error('Error registering talent:', error);
    res.status(500).json({ message: 'Error registering talent', error });
  }
};

module.exports = { registerTalent };
