/* eslint-disable no-unused-vars */

const { success, error, serverError } = require('../helpers/requestResponses');

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

const getRoleById = async (req, res) => {
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
const createRole = async (req, res) => { };
const updateRole = async (req, res) => { };
const deleteRole = async (req, res) => { };

module.exports = {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
};
// ESLINT TEMPORAL
