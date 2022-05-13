const {findUser, saveUser } = require('../models/userModel')
const {PublicError, PrivateError} = require("../utils/error")

const createUser = async (deatils) => {
  try {
    const searchedUser = await findUser({email: deatils.email})
    
    if(searchedUser){
      throw new PublicError('User already exists');
    }
    else{
      const newUser = {
        email : deatils.email,
        fullName  : deatils.name,
        loginPassword : deatils.password,
      }
      return await saveUser(newUser)
    }
  } catch (err) {
    if (err instanceof PublicError) {
      throw new PublicError(err.message);
    } else {
      throw new PrivateError(err.message);
    }
    
  }
};

module.exports = {
  createUser
};