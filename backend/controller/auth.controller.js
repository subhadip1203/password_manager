const {catchAsyncMiddleware} = require("../utils/error")
const {createUser, loginService} =  require("../services/auth.services")

const registerUserController = catchAsyncMiddleware ( async (req, res) => {
  const createdUser = await createUser(req.body);
  res.status(200).send({ success: 1 , user: createdUser});
})

const loginController = catchAsyncMiddleware ( async (req, res) => {
  const {user, accessToken , refreshToken} = await loginService(req.body);
  let options = {
    maxAge: process.env.JWT_REFRESH_TOKEN_EXP*1000,
    httpOnly: true,
  }
  res.status(200).cookie('refreshToken', refreshToken, options).send({ success: 1 , user , accessToken});
})


module.exports = {
  registerUserController,
  loginController
};