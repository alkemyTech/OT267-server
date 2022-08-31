/* eslint-disable no-unused-vars */

const { success, error, serverError } = require('../helpers/requestResponses');

const getAllMembers = async (req, res) => success({ res, message: 'all members' });

module.exports = {
  getAllMembers,
};

// ESLINT TEMPORAL
