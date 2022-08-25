const { generateJWT, validateJWT } = require('./jwt');
const { encryptPassword } = require('./bcrypt');

module.exports = {
  generateJWT,
  validateJWT,
  encryptPassword,
};
