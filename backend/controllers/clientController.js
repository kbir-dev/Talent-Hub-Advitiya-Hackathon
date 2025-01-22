const bcrypt = require('bcrypt');
const { Client } = require('../models/clientRegistration.js');
const jwt = require("jsonwebtoken");
// Controller for client registration
const registerClient = async (req, res) => {
  try {
    const { name, email, password, contactNumber } = req.body;

    // Validate required fields
    if (!name || !email || !password || !contactNumber) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if the client already exists
    const existingClient = await Client.findOne({ email });
    if (existingClient) {
      return res.status(400).json({ message: 'Email is already registered.' });
    }

    // Encrypt the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new client
    const newClient = new Client({
      name,
      email,
      password: hashedPassword,
      contactNumber,
    });

    // Save the client to the database
    const savedClient = await newClient.save();
    console.log("Client Registered")

    res.status(201).json({
      message: 'Client registered successfully!',
      client: {
        id: savedClient._id,
        name: savedClient.name,
        email: savedClient.email,
        contactNumber: savedClient.contactNumber,
      },
    });
  } catch (error) {
    console.error('Error registering client:', error);
    res.status(500).json({ message: 'Error registering client', error });
  }
};


const clientLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    // Find client by email
    const client = await Client.findOne({ email });
    if (!client) {
      return res.status(404).json({ message: "Client not found. Please register first." });
    }

    // Compare passwords
    const isPasswordMatch = await bcrypt.compare(password, client.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: client._id, email: client.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Token valid for 1 hour
    );

    res.status(200).json({
      message: "Login successful!",
      token,
      client: {
        id: client._id,
        name: client.name,
        email: client.email,
        contactNumber: client.contactNumber,
      },
    });
  } catch (error) {
    console.error("Error during client login:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

module.exports = { registerClient , clientLogin};
