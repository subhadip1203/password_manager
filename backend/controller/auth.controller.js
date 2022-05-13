const {createUser} =  require("../services/auth.services")
const {PublicError, PrivateError} = require("../utils/error")

const registerUserController = async (req, res) => {
  try{
    const createdUser = await createUser(req.body);
    res.status(200).send({ success: 1 , user: createdUser});
  }
  catch(err){
    if (err instanceof PublicError) {
      res.status(400).send({ success: 0, err : err.message });
    } else {
      console.log("\x1b[31m",err.message)
      res.status(400).send({ success: 0, err : 'user registration failled' });
  
    }
  }
   
  
};



module.exports = {
  registerUserController,
};