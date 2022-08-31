const { error, serverError } = require('../helpers/requestResponses');

const { Role } = require('../models/index');

const isAdmin = async (req, res, next) => {
  const { roleId } = req;

  let role;

  try {
    role = await Role.findByPk(roleId);
  } catch (err) {
    serverError({ res, message: err.message });
  }
  if (role?.dataValues.name !== 'Admin') return error({ res, message: 'forbidden: admin access is required', status: 403 });

  return next();
};

module.exports = { isAdmin };
