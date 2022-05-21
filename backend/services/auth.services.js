const bcrypt = require('bcrypt');
const saltRounds = 10;
const {findUser, saveUser} = require('../models/userModel')
const {PublicError, PrivateError} = require("../utils/error")
const {createAccessToken} = require("../utils/jwt")


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


const loginService = async (deatils) => {
  try {
    const getUser = await findUser({newemail : deatils.email} , getPassword=true);
    if(getUser &&  await bcrypt.compare(deatils.password, getUser.loginPassword) ) {
      const {loginPassword ,...user } = getUser
      const accessToken = await createAccessToken(user)
      return {user , accessToken}
    }
    else{
      throw new PublicError("login failed");
    }
  } catch (err) {
    if (err instanceof PublicError) {
      throw new PublicError(err.message);
    } else {
      throw new PrivateError(" authService => loginService || "+err.message);
    }
  }
};


module.exports = {
  createUser,
  loginService
};