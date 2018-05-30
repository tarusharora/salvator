
const mongoose = require('mongoose');

const { dbURI } = require('../../config/config');

const connectDB = mongoose.connect(dbURI);

// CONNECTION EVENTS
mongoose.connection.on('connected', () => {
  // console.log(`Mongoose connected to ${dbURI}`);
});
mongoose.connection.on('error', (err) => {
  // console.log(`Mongoose connection error: ${err}`);
  mongoose.disconnect();
});

module.exports = {
  connectDB,
};
require('../models/Client');

