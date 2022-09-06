/* eslint-disable no-unused-vars */
/* eslint-disable no-return-await */

const { success, error, serverError } = require('../helpers/requestResponses');
const { list, createMember } = require('../services/members');

const membersList = async (req, res) => {
  try {
    const data = await list();

    if (data.length === 0) return error({ res, message: 'No members' });

    return success({ res, message: 'Members list', data });
  } catch (err) {
    serverError({ res, message: err.message });
  }
};

const createAMember = async (req, res) => {
  const {
    name, facebookUrl, instagramUrl, linkedinUrl, image, description,
  } = req.body;

  const body = {
    name, facebookUrl, instagramUrl, linkedinUrl, image, description,
  };

  try {
    const newMember = await createMember(body);

    if (!newMember) return error({ res, message: 'Member already exists', status: 409 });

    return success({
      res, message: 'Member created succesfully', data: newMember, status: 201,
    });
  } catch (err) {
    serverError({ res, message: err.message });
  }
};

module.exports = {
  membersList,
  createAMember,
};
