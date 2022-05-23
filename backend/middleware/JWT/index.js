const { verifyAccessToken} = require("../../utils/jwt");
const {catchAsyncMiddleware} = require("../../utils/error")
const { PublicError} = require("../../utils/error");

const authMiddleWare = catchAsyncMiddleware(async (req, res, next) => {
  if(req.headers.authorization ) {
    const [data,error] = await verifyAccessToken(req.headers.authorization)
  
    if(data !== null && error === null ){
      res.locals.user = {...data}
      next()
    }
    
    else if(data === null && error ==='TokenExpiredError') {
      throw new PublicError("token expired");
    }
    
    else{
      throw new PublicError("Auth error");
    }
  }
  else{
    throw new PublicError("missing tokens error");
  }
})

module.exports = {
  authMiddleWare
};