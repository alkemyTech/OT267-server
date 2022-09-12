const { success, error, serverError } = require('../helpers');
const { allRoles, findRoleById } = require('../services/role');

const getAllRoles = async (req, res) => {
  try {
    const data = await allRoles();

    if (data) {
      success({ res, message: 'list of all roles', data });
    } else {
      error({ res, message: 'roles not found' });
    }
  } catch (err) {
    serverError({ res, message: err.message });
  }
};

const getSingleRole = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await findRoleById(id);

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
  getAllRoles,
  getSingleRole,
};
