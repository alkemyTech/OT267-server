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

const editAllOrg = async (req, res) => {
  let allOrg;

  try {
    allOrg = await Organization.findOne({
      attributes: ['name', 'image', 'phone', 'address'],
    });
  } catch (e) {
    return res.sendStatus(500);
  }
};

module.exports = {
  getAllOrg,
};
