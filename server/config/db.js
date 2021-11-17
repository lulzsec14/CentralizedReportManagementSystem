// Imports
const mongoose = require('mongoose');
require('dotenv').config({ path: '../config.env' });
const MONGO_URI = process.env.MONGO_URI;
// ------------------------------------

// Function for connecting to MongoDB Atlas

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`Database connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(`Error occured: ${err.message}`);
  }
};

// ------------------------------------
// Exports
module.exports = { connectDb };
// ------------------------------------

