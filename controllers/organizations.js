const { success, error, serverError } = require('../helpers');
const {
  findOneOrganization, updateByIdOrganization,
} = require('../services/organization');

const getOrganization = async (req, res) => {
  try {
    const data = await findOneOrganization();

    if (data.length === 1) error({ res, message: 'organization not found' });
    else success({ res, message: 'organization data', data });
  } catch (err) {
    serverError({ res, message: err.message });
  }
};

const updateOrganization = async (req, res) => {
  try {
    const orgDataUpdated = await updateByIdOrganization(req.body);
    success({
      res,
      message: 'organization data updated',
      data: orgDataUpdated,
      status: 201,
    });
  } catch (err) {
    serverError({ res, message: err.message });
  }
};

module.exports = {
  getOrganization,
  updateOrganization,
};
