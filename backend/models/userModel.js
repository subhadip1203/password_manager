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
  isDeleted : {
    type: Boolean,
    default: false
  }
});

userSchema.plugin(toJSON);

const User = mongoose.model('User', userSchema);

const findUser = async (filter) => {
  try {
    const companyDetails = await User.findOne({...filter,isDeleted: flase}).exec();
    return companyDetails;
  } catch (err) {
    throw new DBError('could not find User');
  }
};

const saveUser = async (deatils) => {
  try {
    const newUser = new User({ ...deatils });
    return newUser.save();
  } catch (err) {
    throw new DBError('could not save User');
  }
};

const updateUser = async (updateUser) => {
  try {
    await updateUser.save();
    return findCompany;
  } catch (err) {
    throw new DBError('could not update User');
  }
};

module.exports = {User , findUser , saveUser , updateUser};
