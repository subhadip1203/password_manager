const jwt = require("jsonwebtoken");
const { PublicError, PrivateError } = require("./error");

const createAccessToken = async (data) => {
	try {
		const token = jwt.sign({ ...data }, process.env.JWT_ACCESS_SECRET, {
			expiresIn: process.env.JWT_ACCESS_TOKEN_EXP,
		});
		return token;
	} catch (err) {
		throw new PrivateError(" createAccessToken || " + err.message);
	}
};


const verifyAccessToken = async(token) => {
  try{
    const data = await jwt.verify(token, process.env.JWT_ACCESS_SECRET)
    return [data,null]
  }
  catch(err){
    if(err.name =='TokenExpiredError'&& err.message =='jwt expired'){
      return [null , 'TokenExpiredError']
    }
    else if (err instanceof PublicError) {
      throw new PublicError(err.message);
    } else {
      throw new PrivateError(" verifyAccessToken || "+err.message);
    }
  }
}

module.exports = {
	createAccessToken,
	verifyAccessToken,
};
