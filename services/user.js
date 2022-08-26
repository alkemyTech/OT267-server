const { User } = require('../models/index');

const allUsers = async () => {
  const users = await User.findAll({
    attributes: [
      'id',
      'firstName',
      'lastName',
      'email',
      'image',
      'password',
      'roleId',
    ],
  });
  return users;
};

const deleteUser = async (id) => {
  const response = await User.destroy({
    where: { id },
  });
  return response;
};

const findUsers = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (user !== null) {
    return user;
  }
  return null;
};

module.exports = {
  allUsers,
  deleteUser,
  findUsers,
};
