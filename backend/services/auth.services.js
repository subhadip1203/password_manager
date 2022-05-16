const bcrypt = require('bcrypt');
const saltRounds = 10;
const {findUser, saveUser } = require('../models/userModel')
const {PublicError, PrivateError} = require("../utils/error")


const createUser = async (deatils) => {
  try {
    const newUser = {
      email : deatils.email,
      fullName  : deatils.name,
      loginPassword : await bcrypt.hash(deatils.password, saltRounds)
    }
    return await saveUser(newUser)
  } catch (err) {
    if (err instanceof PublicError) {
      throw new PublicError(err.message);
    } else {
      throw new PrivateError(" authService => createUser || "+err.message);
    }
    
  }
};

module.exports = {
  createUser
};