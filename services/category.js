const { Category } = require('../models/index');

const deleteCategory = async (id) => {
  const response = await Category.destroy({
    where: { id },
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

module.exports = { deleteCategory, updateByPk };
