const mongoose = require('mongoose');
const toJSON = require('./plugins/toJson');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: true,
  },

  fullName: {
    type: String,
    trim: true,
    required: true,
  },

  loginPassword: {
    type: String,
    trim: true,
    required: true,
    customtype: 'private',
  },
  passCode: {
    type: String,
    trim: true,
    default: process.env.DEFAULT_PASS_CODE,
    customtype: 'private',
  },
  isDeleted : {
    type: Boolean,
    default: false
  }
});

userSchema.plugin(toJSON);

const User = mongoose.model('User', userSchema);

const findUser = async (filter) => {
  try {
    const companyDetails = await User.findOne({...filter, isDeleted: false}).exec();
    return companyDetails;
  } catch (err) {
    throw new Error(' userModel=>findUser : could not find User');
  }
};

const saveUser = async (deatils) => {
  try {
    const newUser = new User({ ...deatils });
    return newUser.save();
  } catch (err) {
    throw new Error(' userModel=>saveUser : could not save User');
  }
};

const updateUser = async (updateUser) => {
  try {
    await updateUser.save();
    return findCompany;
  } catch (err) {
    throw new Error (' userModel=>updateUser : could not update User');
  }
};

module.exports = {User , findUser , saveUser , updateUser};
