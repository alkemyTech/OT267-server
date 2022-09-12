const { Member } = require('../models/index');

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

const findAllMembers = () => Member.findAll();

const deleteMember = async (id) => Member.destroy({ where: { id } });

const updateMember = (id, body) => Member.update(body, {
  where: { id },
});

module.exports = {
  createMember,
  findAllMembers,
  deleteMember,
  updateMember,
};
