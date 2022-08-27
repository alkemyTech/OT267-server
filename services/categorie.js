const { Categorie } = require('../models/index');

const getAllCategories = async (query) => Categorie.findAll({
  where: query,
  attributes: ['name'],
});

module.exports = {
  getAllCategories,
};
