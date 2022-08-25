// ESLINT TEMPORAL
/* eslint-disable no-unused-vars */

const { Role } = require('../models/index');

const isAdmin = async (req, res, next) => {
  const { roleId } = req;

  let role;

  try {
    role = await Role.findByPk(roleId);
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong', data: {} });
  }

  if (role.dataValues.name !== 'Admin') return res.status(404).json({ message: 'Role not founded or not valid', data: {} });

  next();
};

module.exports = { isAdmin };