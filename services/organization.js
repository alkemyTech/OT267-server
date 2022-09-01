const { Organization } = require('../models/index');
const { Slide } = require('../models/index');

const findOrgPublicData = async () => Organization.findOne({
  attributes: ['name', 'image', 'phone', 'address', 'facebook', 'linkedin', 'instagram'],
  order: [[Slide, 'order', 'ASC']],
  include: {
    model: Slide,
    attributes: ['order', 'image', 'text', 'organizationId'],
  },
});

const findOrgData = async () => Organization.findOne({
  attributes: ['id', 'name', 'image', 'phone', 'address', 'welcomeText', 'email', 'aboutUsText'],
});

module.exports = { findOrgPublicData, findOrgData };
