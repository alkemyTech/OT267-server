const { generateJWT, validateJWT } = require('./jwt');
const { encryptPassword } = require('./bcrypt');
const { sendMail } = require('./sendMail');

module.exports = {
  generateJWT,
  validateJWT,
  encryptPassword,
  sendMail,
};
