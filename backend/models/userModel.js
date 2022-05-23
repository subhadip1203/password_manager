const mongoose = require('mongoose');
const toJSON = require('./plugins/toJson');
const {PublicError, PrivateError} = require("../utils/error")

const userSchema = mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
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

  isDeleted : {
    type: Boolean,
    default: false
  }
});

userSchema.plugin(toJSON);

const User = mongoose.model('User', userSchema);


// getpassword is needed for login purpose
// other cases , we do not need to provide password 
const findUser = async (filter , getPassword=false) => {
  try {
    const userDetails = await User.findOne({...filter, isDeleted: false}).exec();
    if(getPassword){
      const dbUserPass = userDetails.loginPassword
      const userData = userDetails.toJSON() 
      return {...userData , loginPassword: dbUserPass};
    }
    return userDetails.toJSON();
  } catch (err) {
    if (err instanceof PublicError) {
      throw new PublicError(err.message);
    } else {
      throw new PrivateError(" userModel => findUser || "+err.message);
    }
  }
};

const saveUser = async (deatils) => {
  try {
    let user = await findUser({email: deatils.email});
    if(user) throw new PublicError ("user already registered")
    const newUser = new User({ ...deatils });
    return newUser.save();
  } catch (err) {
    if (err instanceof PublicError) {
      throw new PublicError(err.message);
    } else {
      throw new PrivateError(" userModel => saveUser || "+err.message);
    }
  }
};

const updateUser = async (updateUser) => {
  try {
    await updateUser.save();
    return findCompany;
  } catch (err) {
    if (err instanceof PublicError) {
      throw new PublicError(err.message);
    } else {
      throw new PrivateError(" userModel => saveUser || "+err.message);
    }
  }
};

module.exports = {User , findUser , saveUser , updateUser};
