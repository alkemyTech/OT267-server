const { Organization } = require('../models/index');
const { Slide } = require('../models/index');

const findAllOrgData = async () => Organization.findOne({
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

const findOrgData = async () => Organization.findOne({
  attributes: [
    'id',
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
});

const updateOrgDataByPk = async (data) => {
  const org = await findOrgData();

  await Organization.update({ ...data }, { where: { id: org.id } });

  return findOrgData(org.id);
};

module.exports = { findAllOrgData, findOrgData, updateOrgDataByPk };
