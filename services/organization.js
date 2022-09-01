const { Organization } = require('../models/index');
const { Slide } = require('../models/index');

const findOrgPublicData = async () => Organization.findOne({
  order: [[Slide, 'order', 'ASC']],
  attributes: ['name', 'image', 'phone', 'address'],
  include: {
    model: Slide,
    attributes: ['order', 'image', 'text', 'organizationId'],
  },
});

const findOrgData = async () => Organization.findOne({
  attributes: ['id', 'name', 'image', 'phone', 'address', 'welcomeText', 'email', 'aboutUsText'],
});

module.exports = { findOrgPublicData, findOrgData };
