const bcrypt = require('bcrypt');

const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const encrypted = await bcrypt.hash(password, salt);
  return encrypted;
};

const comparePassword = () => {
  bcrypt.compare(password, passwordHashed, (err, result) => {
    if (err) {
      return err;
    }
    if (result) {
      return true;
    }
    return false;
  });
};

module.exports = {
  encryptPassword, comparePassword,
};
