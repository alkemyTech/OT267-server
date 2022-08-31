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

const findRoleById = async (id) => Role.findByPk(id);

module.exports = { allRoles, findRoleById };
