const { User } = require('../models/index');

const { encryptPassword } = require('../helpers/index');

const allUsers = async () => {
  const users = await User.findAll({
    attributes: [
      'id',
      'firstName',
      'lastName',
      'email',
      'image',
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

const findUserByMail = async (email) => {
  const user = await User.findOne({ where: { email } });

  return user;
};

const findUserById = async (id) => {
  const user = await User.findByPk(id);

  return user;
};

const createUser = async (
  firstName,
  lastName,
  email,
  password,
  image,
  roleId,
) => {
  const encrypted = await encryptPassword(password);

  await User.create({
    firstName,
    lastName,
    email,
    password: encrypted,
    image,
    roleId: roleId || 2,
  });

  const user = await findUserByMail(email);

  return user;
};

module.exports = {
  allUsers,
  deleteUser,
  findUsers,
  createUser,
  findUserByMail,
  findUserById,
};
