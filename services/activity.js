const { Activity } = require('../models/index');

const findAllActivities = async () => Activity.findAll({
  attributes: ['id', 'name', 'content', 'image'],
});

const newActivity = async (name, content, image) => Activity.create({
  name,
  content,
  image,
});

const updateByIdActivity = async (id, data) => Activity.update({ ...data }, { where: { id } });

const findByPkActivity = async (id) => Activity.findByPk(id);

module.exports = {
  findAllActivities,
  newActivity,
  updateByIdActivity,
  findByPkActivity,
};
