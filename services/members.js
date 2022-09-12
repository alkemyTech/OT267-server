const { Member } = require('../models/index');

// eslint-disable-next-line no-return-await

const createMember = async (body) => {
  const [member, created] = await Member.findOrCreate({
    where: {
      name: body.name,
    },
    defaults: body,
  });
  if (created) return member;
  return created;
};

const findAllMembers = async () => Member.findAll();

const findMember = async (id) => {
  const member = await Member.findOne({
    where: {
      id,
    },
  });

  return member;
};

const deleteMember = async (id) => Member.destroy({ where: { id } });

module.exports = {
  createMember,
  findAllMembers,
  findMember,
  deleteMember,
};
