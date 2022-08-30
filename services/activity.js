const { Activity } = require('../models/index');

const allActivities = async () => Activity.findAll({
  attributes: [
    'id',
    'name',
    'content',
    'image',
  ],
});

const newActivity = async (
  name,
  content,
  image,
) => Activity.create({
  name,
  content,
  image,
});

module.exports = {
  allActivities,
  newActivity,
};
