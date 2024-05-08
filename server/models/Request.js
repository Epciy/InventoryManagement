const mongoose = require('mongoose');


const requestSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'user_role'
  },
  material_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Material',
    required: true
  },
  request_type: {
    type: String,
    enum: ['assignment', 'return'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },
  user_role: {
    type: String,
    enum: ['individual', 'organization'],
    required: true
  },
  
  timestamp: {
    type: Date,
    default: Date.now
  },
  
});

const Request = mongoose.model('Request', requestSchema);


module.exports = Request;
