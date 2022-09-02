const { Slide } = require('../models/index');

const getSlides = async () => Slide.findAll({
  attributes: [
    'id',
    'image',
    'order',
  ],
  order: [
    ['order', 'ASC'],
  ],
});

const updateSlideByPk = async (id, data) => {
  const slide = await Slide.update({ ...data }, {
    where: { id },
  });
  return slide;
};

module.exports = {
  getSlides,
  updateSlideByPk,
};
