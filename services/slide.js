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

const createASlide = async (body) => Slide.create({
  text: body.text,
  // image: body.image,
  image: 'http://sfnasflaisjfioa.com',
  order: body.order,
  organizationId: body.organizationId ?? 1,
});

module.exports = {
  createASlide,
  getSlides,
  getASlide,
  updateSlideByPk,
  deleteSlideByPk,
};
