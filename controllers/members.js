const { success, error, serverError } = require('../helpers/requestResponses');

const {
  createMember,
  findAllMembers,
  deleteMember,
  updateAMember,
} = require('../services/members');

const createNewMember = async (req, res) => {
  const {
    name, facebookUrl, instagramUrl, linkedinUrl, image, description,
  } = req.body;

  try {
    const newMember = await createMember({
      name,
      facebookUrl,
      instagramUrl,
      linkedinUrl,
      image,
      description,
    });

    if (!newMember) return error({ res, message: 'member already exists', status: 409 });

    return success({
      res, message: 'member created succesfully', data: newMember, status: 201,
    });
  } catch (err) {
    return serverError({ res, message: err.message });
  }
};

const getAllMembers = async (_req, res) => {
  try {
    const data = await findAllMembers();
    if (data.length === 0) return error({ res, message: 'no members' });

    return success({ res, message: 'members list', data });
  } catch (err) {
    return serverError({ res, message: err.message });
  }
};

const deleteSingleMember = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await deleteMember(id);

    if (response === 0) return error({ res, message: 'Member not found' });
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
    return serverError({ res, message: err.message });
  }
};

module.exports = {
  createNewMember,
  getAllMembers,
  deleteSingleMember,
  updateMember,
};
