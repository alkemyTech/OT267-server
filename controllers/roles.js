const { success, error, serverError } = require('../helpers');
const { findAllRoles, findByPkRole } = require('../services/role');

const getRoles = async (req, res) => {
  try {
    const data = await findAllRoles();

    if (data) {
      success({ res, message: 'list of all roles', data });
    } else {
      error({ res, message: 'roles not found' });
    }
  } catch (err) {
    serverError({ res, message: err.message });
  }
};

const getRole = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await findByPkRole(id);

    if (data) {
      success({ res, message: 'role details', data });
    } else {
      error({ res, message: 'role not found' });
    }
  } catch (err) {
    serverError({ res, message: err.message });
  }
};

module.exports = {
  getRoles,
  getRole,
};
