const mongoose = require('mongoose');
const toJSON = require('./plugins/toJson');

const userSchema = mongoose.Schema({
  customuserId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },

  name: {
    type: String,
    trim: true,
    required: true,
  },

  loginPassword: {
    type: String,
    trim: true,
    required: true,
    customtype: 'static',
  },
  passCode: {
    type: String,
    trim: true,
    default: process.env.DEFAULT_PASS_CODE,
    customtype: 'static',
  },
});

userSchema.plugin(toJSON);

const Company = mongoose.model('User', userSchema);

module.exports = Company;
