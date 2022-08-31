const { User } = require('../models/index');

const { encryptPassword } = require('../helpers/index');

const allUsers = async () => User.findAll({
  attributes: [
    'id',
    'firstName',
    'lastName',
    'email',
    'image',
    'roleId',
  ],
});

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

const findUserByMail = async (email) => User.findOne({ where: { email } });

const updatebyPk = async (id, body) => {
  const {
    firstName, lastName, email, image, roleId,
  } = body;
  return User.update({
    firstName, lastName, email, image, roleId,
  }, { where: { id } });
};

const findUserById = async (id) => User.findByPk(id);

const createUser = async (
  {
    firstName,
    lastName,
    email,
    password,
    image,
    roleId,
  },
) => {
  const encrypted = await encryptPassword(password);

  return User.create({
    firstName,
    lastName,
    email,
    password: encrypted,
    image,
    roleId: roleId || 2,
  });
};

module.exports = {
  allUsers,
  deleteUser,
  findUsers,
  createUser,
  findUserByMail,
  findUserById,
  updatebyPk,
};
