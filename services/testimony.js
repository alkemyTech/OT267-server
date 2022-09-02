const { Testimony } = require('../models/index');

const allTestimonies = async () => Testimony.findAll({
  attributes: [
    'id',
    'name',
    'image',
    'content',
  ],
});

const createTestimony = async (name, content) => {
  const [testimony, created] = await Testimony.findOrCreate({
    where: {
      name: name.toLowerCase(),
      content,
    },
  });

  if (created) return testimony;
  return created;
};

const findTestimonyByPk = async (id) => Testimony.findByPk(id);

const destroyTestimony = async (id) => {
  const response = await Testimony.destroy({
    where: { id },
  });
  return response;
};

module.exports = {
  allTestimonies, createTestimony, findTestimonyByPk, destroyTestimony,
};
