const { Testimony } = require('../models/index');

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

const findTestimony = async (id) => {
  const testimony = await Testimony.findOne({
    where: {
      id,
    },
  });

  return testimony;
};

const updateTestimonies = async (id, data) => {
  const { name, image, content } = data;

  await Testimony.update({ name, image, content }, {
    where: {
      id,
    },
  });
};

module.exports = {
  createTestimony,
  findTestimony,
  updateTestimonies,
};
