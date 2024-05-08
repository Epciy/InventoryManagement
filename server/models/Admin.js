const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
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
    default: 'administrator'
  }
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
