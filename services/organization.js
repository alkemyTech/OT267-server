const { Organization } = require('../models/index');
const { Slide } = require('../models/index');

const findOneOrganization = async () => Organization.findOne({
  where: { id: 1 },
  attributes: [
    'name',
    'image',
    'phone',
    'address',
    'facebook',
    'linkedin',
    'instagram',
    'welcomeText',
    'email',
    'aboutUsText',
  ],
  order: [[Slide, 'order', 'ASC']],
  include: {
    model: Slide,
    attributes: ['order', 'image', 'text', 'organizationId'],
  },
});

const updateByIdOrganization = async (data) => {
  await Organization.update({ ...data }, { where: { id: 1 } });

  return findOneOrganization();
};

module.exports = { findOneOrganization, updateByIdOrganization };
