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

const getASlide = async (id) => Slide.findOne({ where: { id } });

const updateSlideByPk = async (id, data) => {
  const slide = await Slide.update({ ...data }, {
    where: { id },
  });
  return slide;
};

const deleteSlideByPk = async (id) => {
  const deleted = await Slide.destroy({
    where: { id },
  });
  return deleted;
};

module.exports = {
  getSlides,
  getASlide,
  updateSlideByPk,
  deleteSlideByPk,
};
