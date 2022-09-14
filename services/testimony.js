const { Testimony } = require('../models/index');

const findAllTestimonies = async () => Testimony.findAll({
  attributes: [
    'id',
    'name',
    'image',
    'content',
  ],
});

const findOrCreateTestimony = async (name, content) => {
  const [testimony, created] = await Testimony.findOrCreate({
    where: {
      name: name.toLowerCase(),
      content,
    },
  });

  if (created) return testimony;
  return created;
};

const updateByIdTestimony = async (id, data) => Testimony.update({ ...data }, { where: { id } });

const findByPkTestimony = async (id) => Testimony.findByPk(id);

const destroyTestimony = async (id) => Testimony.destroy({ where: { id } });

module.exports = {
  findAllTestimonies,
  findOrCreateTestimony,
  updateByIdTestimony,
  findByPkTestimony,
  destroyTestimony,
};
