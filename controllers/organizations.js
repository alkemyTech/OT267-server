const { success, error, serverError } = require('../helpers');
const {
  findAllOrgData,
  updateOrgDataByPk,
} = require('../services/organization');

const getAllOrgData = async (req, res) => {
  try {
    const data = await findAllOrgData();

    if (data.length === 1) error({ res, message: 'organization not found' });
    else success({ res, message: 'organization data', data });
  } catch (err) {
    serverError({ res, message: err.message });
  }
};

const updateOrgData = async (req, res) => {
  try {
    const orgDataUpdated = await updateOrgDataByPk(req.body);
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
  getAllOrgData,
  updateOrgData,
};
