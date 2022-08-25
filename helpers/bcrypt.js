const bcrypt = require('bcrypt');

const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const encrypted = await bcrypt.hash(password, salt);
  return encrypted;
};

const comparePassword = (password, passwordHashed) => {
  
  const validPassword = bcrypt.compareSync(password, passwordHashed);
  
  if (!validPassword) return false;
  return true;

};

module.exports = {
  encryptPassword, comparePassword,
};
