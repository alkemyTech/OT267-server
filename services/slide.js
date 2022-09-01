const { Slides } = require('../models/index');

const getSlides = async () => {
  const roles = await Slides.findAll({
    attributes: [
      'id',
      'imageURL',
      'order',
    ],
    order: [
      ['order', 'ASC'],
    ],
  });
  return roles;
};

module.exports = { getSlides };
