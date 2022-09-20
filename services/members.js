const { Member } = require('../models/index');

const findOrCreateMember = async (body) => Member.create(body);

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
