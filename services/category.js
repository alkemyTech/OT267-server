const { Category } = require('../models/index');

const deleteCategory = async (id) => {
  const response = await Category.destroy({
    where: { id },
  });
  return response;
};

module.exports = { deleteCategory };
