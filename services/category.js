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

const categoryFindById = async (id) => Category.findByPk(id, {
  attributes: [
    'name',
    'description',
    'image',
  ],
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

const updateByPk = async (id, body) => {
  const category = await Category.findByPk(id);
  category.set(body);
  await category.save();
  return category;
};

module.exports = {
  deleteCategory,
  allCategoriesName,
  categoryFindById,
  createCategory,
  updateByPk,
};
