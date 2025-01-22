const mongoose = require('mongoose');
const dotenv = require('dotenv')

dotenv.config()

const connectDatabase = async () => {
  try {
    console.log(process.env.MONGO_URL)
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Database connection successful');
  } catch (error) {
    console.error('Database connection error:', error.message);
    process.exit(1); // Exit the process with failure code
  }
};

module.exports = connectDatabase;
