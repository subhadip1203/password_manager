const { verifyAccessToken} = require("../../utils/jwt");
const {catchAsyncMiddleware} = require("../../utils/error")

const authMiddleWare = catchAsyncMiddleware(async (req, res, next) => {
  if(req.headers.authorization ) {
    const [data,error] = await verifyAccessToken(req.headers.authorization)
    //--- if all ok -----//
    if(data !== null && error === null ){
      res.locals.user = {...data}
      next()
    }
    //--- if token valid but expired -----//
    else if(data === null && error ==='TokenExpiredError') {
      res.status(400).send({message: "token expired"})
    }
    //--- if token invalid -----//
    else{
      res.status(400).send({message: "auth error"})
    }
  }
  else{
    res.status(400).send({message: "missing tokens error"})
  }
})

module.exports = {
  authMiddleWare
};