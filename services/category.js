const { Category } = require('../models/index');

const findOrCreateCategory = async (data) => {
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

const findByPkCategory = async (id) => Category.findByPk(id, {
  attributes: ['name', 'description', 'image'],
});

const destroyCategory = async (id) => {
  const response = await Category.destroy({
    where: { id },
  });
  return response;
};

const findByNameCategories = async () => {
  const response = await Category.findAll({
    attributes: ['name'],
  });
  return response;
};

const updateByIdCategory = async (id, data) => {
  await Category.update({ ...data }, { where: { id } });

  return findByPkCategory(id);
};

module.exports = {
  destroyCategory,
  findByNameCategories,
  findByPkCategory,
  findOrCreateCategory,
  updateByIdCategory,
};
