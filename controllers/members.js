/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
const { success, error, serverError } = require('../helpers/requestResponses');
const { findAllMembers, findMember, deleteSingleMember } = require('../services/members');

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

module.exports = {
  membersList,
  removeMember,
};
