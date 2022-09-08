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

const findAllMembers = () => Member.findAll();

const findMember = async (id) => {
  const member = await Member.findOne({
    where: {
      id,
    },
  });

  return member;
};

const deleteSingleMember = async (id) => {
  await Member.destroy({
    where: {
      id,
    },
  });
};

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
  findMember,
  deleteSingleMember,
  updateAMember,
};
