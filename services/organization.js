const { Organization } = require('../models/index');

const findOrgPublicData = async () => Organization.findOne({
  attributes: ['name', 'image', 'phone', 'address', 'facebook', 'linkedin', 'instagram'],
});

const findOrgData = async () => Organization.findOne({
  attributes: ['id', 'name', 'image', 'phone', 'address', 'welcomeText', 'email', 'aboutUsText'],
});

module.exports = { findOrgPublicData, findOrgData };
