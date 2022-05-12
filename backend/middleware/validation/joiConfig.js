const Joi = require("joi");

const joiMiddleWare = (validateSchame) => (req, res, next) => {
  
  let req_body_err = [];
  let req_query_err = [];

  if (validateSchame.body) {
    const { value, error } = validateSchame.body.validate(req.body,{abortEarly: false});
    if (error) {
      req_body_err =error.details.map(v=> v.message)
    }
  }
  if (validateSchame.query) {
    const { value, error } = validateSchame.query.validate(req.query,{abortEarly: false});
    if (error) {
      req_query_err = error.details.map(v=> v.message);
    }
  }

  if (req_body_err || req_query_err ) {
    res.status(404).send({error:[...req_body_err, ...req_query_err]})
  } 
  else{
    next();
  }
  
  
};

module.exports = joiMiddleWare;


