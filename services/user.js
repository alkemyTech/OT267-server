const { User } = require('../models/index');

const { encryptPassword } = require('../helpers/index');

const findAllUsers = async () => User.findAll({
  attributes: [
    'id',
    'firstName',
    'lastName',
    'email',
    'image',
    'roleId',
  ],
});

const destroyUser = async (id) => {
  const response = await User.destroy({
    where: { id },
  });
  return response;
};

const findOneUser = async (email) => User.findOne({ where: { email } });

const updateByIdUser = async (id, data) => User.update({ ...data }, { where: { id } });

const findByPkUser = async (id) => User.findByPk(id);

const newUser = async (
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
  findAllUsers,
  destroyUser,
  findOneUser,
  newUser,
  updateByIdUser,
  findByPkUser,
};
