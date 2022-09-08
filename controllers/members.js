/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-return-await */

const { success, error, serverError } = require('../helpers/requestResponses');

const {
  createMember,
  findAllMembers,
  findMember,
  deleteSingleMember,
  updateAMember,
} = require('../services/members');

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

const membersList = async (_req, res) => {
  try {
    const data = await findAllMembers();
    if (data.length === 0) return error({ res, message: 'No members' });

    return success({ res, message: 'Members list', data });
  } catch (err) {
    serverError({ res, message: err.message });
  }
};

const removeMember = async (req, res) => {
  const { id } = req.params;

  // eslint-disable-next-line radix
  const idParsed = parseInt(id);

  try {
    const data = await findMember(idParsed);

    if (!data) return error({ res, message: 'Member not found' });

    await deleteSingleMember(idParsed);
  } catch (err) {
    serverError({ res, message: err.message });
  }

  return success({ res, message: 'member removed' });
};

const updateMember = async (req, res) => {
  try {
    const { id } = req.params;
    const [data] = await updateAMember(id, req.body);
    return data
      ? success({ res, message: 'Member updated successfully' })
      : error({ res, message: 'Member not found' });
  } catch (err) {
    serverError({ res, message: err.message });
  }
};

module.exports = {
  createAMember,
  membersList,
  removeMember,
  updateMember,
};
