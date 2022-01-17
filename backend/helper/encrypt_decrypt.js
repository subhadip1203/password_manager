const crypto = require('crypto');

// ENC_KEY and IV can be generated as crypto.randomBytes(32).toString('hex');
const ENC_KEY = process.env.ENCRYPTION_KEY;     // set random encryption key
const IV = process.env.INITIAL_VECTOR;          // set random initialisation vector

const phrase = "who let the dogs out";

var encrypt = ((val) => {
  let cipher = crypto.createCipheriv('aes-256-cbc', ENC_KEY, IV);
  let encrypted = cipher.update(val, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return encrypted;
});

var decrypt = ((encrypted) => {
  let decipher = crypto.createDecipheriv('aes-256-cbc', ENC_KEY, IV);
  let decrypted = decipher.update(encrypted, 'base64', 'utf8');
  return (decrypted + decipher.final('utf8'));
});

module.exports = {encrypt , decrypt}