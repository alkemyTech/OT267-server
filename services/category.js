const { Category } = require('../models/index');

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

module.exports = {
  deleteCategory,
  categoryFindById,
};
