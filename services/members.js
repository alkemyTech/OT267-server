const { Member } = require('../models/index');

const list = async () => Member.findAll();

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

module.exports = {
  list,
  createMember,
};
