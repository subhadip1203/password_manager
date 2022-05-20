const { verifyAccessToken,verifyRefreshToken } = require("../../utils/jwt");
const {catchAsyncMiddleware} = require("../../utils/error")

const authMiddleWare = catchAsyncMiddleware(async (req, res, next) => {
  if(req.headers.authorization && req.cookies.refresh_token){
    
    const [data,error] = verifyAccessToken(req.cookies.refresh_token)
    const dataRefreshToken = verifyRefreshToken(req.cookies.refresh_token)
    
    console.log(data)
    console.log(dataRefreshToken)

    res.send(400).send({message: "auth error"})
  
  }
  else{
    res.send(400).send({message: "auth error"})
  }
})

module.exports = {
  authMiddleWare
};