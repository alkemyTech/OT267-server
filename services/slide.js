const { Slide } = require('../models');

const updateSlideByPk = async (id, data) => {
  const slide = await Slide.update({ ...data }, {
    where: { id },
  });
  return slide;
};

module.exports = {
  updateSlideByPk,
};
