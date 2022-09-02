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

const deleteSlideByPk = async (id) => {
  const deleted = await Slide.destroy({
    where: { id },
  });
  return deleted;
};

module.exports = {
  getSlides,
  deleteSlideByPk,
};
