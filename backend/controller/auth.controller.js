const {catchAsyncMiddleware} = require("../utils/error")
const {createUser, loginService} =  require("../services/auth.services")

const registerUserController = catchAsyncMiddleware ( async (req, res) => {
  const createdUser = await createUser(req.body);
  res.status(200).send({ success: 1 , user: createdUser});
})

const loginController = catchAsyncMiddleware ( async (req, res) => {
  const getLoginUser = await loginService(req.body);
  res.status(200).send({ success: 1 , user: getLoginUser});
})


module.exports = {
  registerUserController,
  loginController
};