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

module.exports = { getSlides, getASlide };
