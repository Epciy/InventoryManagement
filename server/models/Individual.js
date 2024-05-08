const mongoose = require('mongoose');

const individualSchema = new mongoose.Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  username:{
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'individual'
  }
});

const Individual = mongoose.model('Individual', individualSchema);

module.exports = Individual;
