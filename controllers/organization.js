const { Organization } = require('../models');

const getAllOrg = async (req, res) => {
  let allOrg;

  try {
    allOrg = await Organization.findOne({
      attributes: ['name', 'image', 'phone', 'address'],
    });
  } catch (e) {
    return res.status(500).json({ message: 'Something went wrong', data: {} });
  }

  if (!allOrg.length === 0) return res.status(404).json({ message: 'Data not founded', data: {} });

  return res.status(200).json({ message: 'Public data', data: allOrg });
};

const editOrgData = async (req, res) => {
  const {
    name, image, phone, address,
  } = req.body;

  const body = {
    name, image, phone, address,
  };

  let allOrg;

  try {
    allOrg = await Organization.findOne({
      attributes: ['id', 'name', 'image', 'phone', 'address'],
    });
  } catch (e) {
    return res.status(500).json({ message: 'Something went wrong', data: {} });
  }

  if (!allOrg) return res.status(404).json({ message: 'Org. data not founded', data: {} });

  Object.assign(allOrg.dataValues, body);

  await allOrg.save();

  return res.status(200).json({ message: 'Org updated succesfully', data: allOrg });
};

module.exports = {
  getAllOrg,
  editOrgData,
};
