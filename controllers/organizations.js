/* eslint-disable consistent-return */
const { success, error, serverError } = require('../helpers/requestResponses');

const { findOrgPublicData, findOrgData } = require('../services/organization');

const getOrg = async (req, res) => {
  let data;

  try {
    data = await findOrgPublicData();
  } catch (err) {
    serverError({ res, message: err.message });
  }

  if (data.length === 1) return error({ res, message: 'organization not found' });

  return success({ res, message: 'organization data', data });
};

const editOrgData = async (req, res) => {
  const {
    name, image, phone, address, welcomeText, email, aboutUsText,
  } = req.body;

  let org;

  try {
    org = await findOrgData();
  } catch (err) {
    serverError({ res, message: err.message });
  }

  if (!org) return error(res, 'organization not found');

  org.name = name || org.dataValues.name;
  org.image = image || org.dataValues.image;
  org.phone = phone || org.dataValues.phone;
  org.address = address || org.dataValues.address;
  org.welcomeText = welcomeText || org.dataValues.welcomeText;
  org.aboutUsText = aboutUsText || org.dataValues.aboutUsText;
  org.email = email || org.dataValues.email;

  await org.save()
    .then((data) => success({
      res, message: 'organization updated', data, status: 201,
    }))
    .catch((err) => serverError({ res, message: err.message }));
};

module.exports = {
  getOrg,
  editOrgData,
};
