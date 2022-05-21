
class GeneralError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
}

class PublicError extends GeneralError {}
class PrivateError extends GeneralError {}


const catchAsyncMiddleware= (fn) => (req, res, next) => {
  Promise
  .resolve(fn(req, res, next))
  .catch((err) =>{ 
    if (err instanceof PublicError) {
      res.sendStatus(400).send({ success: 0, err : err.message });
    } else {
      console.log("\x1b[31m",err.message)
      res.sendStatus(400).send({ success: 0, err : 'server error' });
    }
  });
};

module.exports = {PublicError, PrivateError, catchAsyncMiddleware };

