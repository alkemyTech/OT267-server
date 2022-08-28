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
    name, image, phone, address, welcomeText, email, aboutUsText,
  } = req.body;

  let allOrg;

  try {
    allOrg = await Organization.findOne({
      attributes: ['id', 'name', 'image', 'phone', 'address', 'welcomeText', 'email', 'aboutUsText'],
    });
  } catch (e) {
    return res.status(500).json({ message: 'Something went wrong', data: {} });
  }

  if (!allOrg) return res.status(404).json({ message: 'Org. to edit not found', data: {} });

  allOrg.name = name || allOrg.dataValues.name;
  allOrg.image = image || allOrg.dataValues.image;
  allOrg.phone = phone || allOrg.dataValues.phone;
  allOrg.address = address || allOrg.dataValues.address;
  allOrg.welcomeText = welcomeText || allOrg.dataValues.welcomeText;
  allOrg.aboutUsText = aboutUsText || allOrg.dataValues.aboutUsText;
  allOrg.email = email || allOrg.dataValues.email;

  await allOrg.save()
    .then((data) => res.status(200).json({ message: 'Org updated succesfully', data }))
    .catch((error) => res.status(500).json({ message: error.message, data: {} }));
};

module.exports = {
  getAllOrg,
  editOrgData,
};
