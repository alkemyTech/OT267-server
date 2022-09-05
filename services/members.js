const { Member } = require('../models/index');

// eslint-disable-next-line no-return-await
const findAllMembers = async () => await Member.findAll();

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

module.exports = {
  findAllMembers,
  findMember,
  deleteSingleMember,
};
