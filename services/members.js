const { Member } = require('../models/index');

const findOrCreateMember = async (body) => {
  const {
    name, facebookUrl, instagramUrl, linkedinUrl, image, description,
  } = body;
  const [member, created] = await Member.findOrCreate({
    where: {
      name,
    },
    defaults: {
      facebookUrl, instagramUrl, linkedinUrl, image, description,
    },
  });

  if (created) return member;
  return created;
};

const findAllMembers = () => Member.findAll();

const destroyMember = async (id) => Member.destroy({ where: { id } });

const updateByIdMember = (id, body) => Member.update(body, {
  where: { id },
});

module.exports = {
  findOrCreateMember,
  findAllMembers,
  destroyMember,
  updateByIdMember,
};
