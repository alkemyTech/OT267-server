/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

const { allRoles, findRoleById } = require('../services/role');

const getAllRoles = async (req, res) => {
  try {
    const data = await allRoles();

    if (data) {
      res.status(200).json({ message: 'all roles', data });
    } else {
      res.status(400).send('roles not found');
    }
  } catch (error) {
    console.log(error);
  }
};

const getRoleById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await findRoleById(id);
    console.log(data);
    if (data) {
      res.status(200).json({ message: 'role', data });
    } else {
      res.status(400).send('role not found');
    }
  } catch (error) {
    console.log(error);
  }
};
const createRole = async (req, res) => {};
const updateRole = async (req, res) => {};
const deleteRole = async (req, res) => {};

module.exports = {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
};
// ESLINT TEMPORAL
