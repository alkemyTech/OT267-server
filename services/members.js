const { Member } = require('../models/index');

// eslint-disable-next-line no-return-await
const list = async () => await Member.findAll();

const findMember = async (id) => {
  const member = await Member.findOne({
    where: {
      id,
    },
  });

  return member;
};

const memberRemoved = async (id) => {
  await Member.destroy({
    where: {
      id,
    },
  });
};

module.exports = {
  list,
  findMember,
  memberRemoved,
};
