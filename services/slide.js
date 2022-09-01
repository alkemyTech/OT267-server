const { Slides } = require('../models');

const updateSlideByPk = async (id, data) => {
  const slide = await Slides.update({ ...data }, {
    where: { id },
  });
  return slide;
};

module.exports = {
  updateSlideByPk,
};
