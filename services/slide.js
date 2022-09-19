const { Slide } = require('../models/index');

const finAllSlides = async () => Slide.findAll({
  attributes: [
    'id',
    'image',
    'order',
  ],
  order: [
    ['order', 'ASC'],
  ],
});

const findOneSlide = async (id) => Slide.findOne({ where: { id } });

const updateByIdSlide = async (id, data) => {
  const slide = await Slide.update({ ...data }, {
    where: { id },
  });
  return slide;
};

const destroySlide = async (id) => {
  const deleted = await Slide.destroy({
    where: { id },
  });
  return deleted;
};

const newSlide = async (body) => Slide.create({
  text: body.text,
  image: body.image,
  order: body.order,
  organizationId: body.organizationId ?? 1,
});

module.exports = {
  newSlide,
  destroySlide,
  updateByIdSlide,
  findOneSlide,
  finAllSlides,
};
