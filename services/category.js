const { Categorie } = require('../models/index');

const createCategory = async (name) => Categorie.findOrCreate({ where: { name } });

module.exports = {
  createCategory,
};
