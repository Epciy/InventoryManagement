const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['stored', 'in use'],
    default: 'stored',
    required: true
  },
  entrusted_to: {
    type: {
      type: String,
      enum: ['individual', 'organization', null], // null represents no entrustment
      default: null
    },
    individual: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Individual'
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organization'
    }
  }
});

const Material = mongoose.model('Material', materialSchema);

module.exports = Material;





