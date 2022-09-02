const { Member } = require('../models/index');

const list = async () => Member.findAll();

module.exports = {
  list,
};
