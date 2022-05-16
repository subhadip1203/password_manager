const {createUser} =  require("../services/auth.services")
const {catchAsyncMiddleware} = require("../utils/error")

const registerUserController = catchAsyncMiddleware ( async (req, res) => {
  const createdUser = await createUser(req.body);
  res.status(200).send({ success: 1 , user: createdUser});
})


module.exports = {
  registerUserController,
};