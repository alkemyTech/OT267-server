const { Testimony } = require('../models/index');

const findOrCreateTestimony = async (body) => {
  const { name, content, image } = body;
  const [testimony, created] = await Testimony.findOrCreate({
    where: {
      name: name.toLowerCase(),
    },
    defaults: { content, image },
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
