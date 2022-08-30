const { Category } = require('../models/index');

const createCategory = async (name) => Category.findOrCreate({ where: { name } });

// eslint-disable-next-line no-return-await
const categoryFindById = async (id) => await Category.findByPk(id, {
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
  if (!category || category === null) throw new Error(`Not found category for id: ${id}`);
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
