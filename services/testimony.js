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
      id: id
    }
  });

  return testimony;

}

const updateTestimonies = async (id, data) => {

  const { name, image, content } = data;

  const testimonyUpdated = await Testimony.update({ name: name, image: image, content: content }, {
    where: {
      id: id
    }
  });

  return testimonyUpdated;

};

module.exports = {
  createTestimony,
  findTestimony,
  updateTestimonies
};
