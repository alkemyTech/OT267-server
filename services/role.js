const { Role } = require('../models/index');

const allRoles = async () => {
  const roles = await Role.findAll({
    attributes: [
      'id',
      'name',
      'description',
    ],
  });
  return roles;
};

const findRoleById = async (id) => {
  const role = await Role.findByPk(id);

  return role;
};

module.exports = { allRoles, findRoleById };
