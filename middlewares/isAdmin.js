// ESLINT TEMPORAL
/* eslint-disable no-unused-vars */

const { Role } = require('../models/index');

const isAdmin = async (req, res, next) => {
  const { status, message, roleId } = req;

  const role = await Role.findByPk(roleId);

  if (!role) {
    return res.status(400).json({
      status: false,
      message: 'Something went wrong',
      data: {},
    });
  }

  if (role.dataValues.name === 'Admin') {
    next();
  } else {
    return res.status(404).json({
      status: false,
      message: 'Route not founded',
      data: {},
    });
  }
};

module.exports = { isAdmin };
