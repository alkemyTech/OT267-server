const { Category } = require('../models/index');

const deleteCategory = async (id) => {
  const response = await Category.destroy({
    where: { id },
  });
  return response;
};

const allCategories = async () => {
  const response = await Category.findAll({
    attributes: ['name'],
  });
  return response;
};

module.exports = { deleteCategory, allCategories };
