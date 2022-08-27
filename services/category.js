const { Categorie } = require('../models/index');

const createCategory = async (name) => Categorie.create({ name });

module.exports = {
  createCategory,
};
