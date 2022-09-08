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

const updateAMember = async (id, body) => {
  const response = await Member.update({
    ...body,
  }, {
    where: { id },
  });
  return response;
};

module.exports = {
  createMember,
  findAllMembers,
  deleteMember,
  updateAMember,
};
