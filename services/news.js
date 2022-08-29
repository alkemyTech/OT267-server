const { News } = require('../models/index');

const getNew = async (id) => News.findByPk(id);

module.exports = {
  getNew,
};
