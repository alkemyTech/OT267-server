const { Role } = require('../models/index');

const findAllRoles = async () => {
  const roles = await Role.findAll({
    attributes: [
      'id',
      'name',
      'description',
    ],
  });
  return roles;
};

const findByPkRole = async (id) => Role.findByPk(id);

module.exports = { findAllRoles, findByPkRole };
