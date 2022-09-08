const { Category } = require('../models/index');

const createCategory = async (data) => {
  const { name, description, image } = data;

  const [category, created] = await Category.findOrCreate({
    where: { name: name.toLowerCase() },
    defaults: {
      description: description ?? '',
      image: image ?? '',
    },
  });

  if (created) return category;
  return created;
};

const findCategoryById = async (id) => Category.findByPk(id, {
  attributes: ['name', 'description', 'image'],
});

const deleteCategory = async (id) => {
  const response = await Category.destroy({
    where: { id },
  });
  return response;
};

const allCategoriesName = async () => {
  const response = await Category.findAll({
    attributes: ['name'],
  });
  return response;
};

const updateCategoryByPk = async (id, data) => {
  await Category.update({ ...data }, { where: { id } });

  return findCategoryById(id);
};

module.exports = {
  deleteCategory,
  allCategoriesName,
  findCategoryById,
  createCategory,
  updateCategoryByPk,
};
