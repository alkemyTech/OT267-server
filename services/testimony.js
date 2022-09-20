const { Testimony } = require('../models/index');

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

const findByPkTestimony = async (id) => Testimony.findByPk(id, {
  attributes: {
    exclude: ['deletedAt'],
  },
});

const updateByIdTestimony = async (id, data) => {
  await Testimony.update({ ...data }, {
    where: { id },
    attributes: {
      exclude: ['deletedAt'],
    },
  });
  const testimony = await findByPkTestimony(id);
  return testimony;
};

const destroyTestimony = async (id) => Testimony.destroy({ where: { id } });

module.exports = {
  findOrCreateTestimony,
  updateByIdTestimony,
  findByPkTestimony,
  destroyTestimony,
};
