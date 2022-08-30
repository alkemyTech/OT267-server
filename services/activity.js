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

const updateByPk = async (id, body) => {
  const activity = await Activity.findByPk(id);
  if (!activity) return null;

  // eslint-disable-next-line no-restricted-syntax
  for (const i in body) {
    if (activity[i]) activity[i] = body[i];
  }
  await activity.save();

  return activity;
};

module.exports = {
  allActivities,
  newActivity,
  updateByPk,
};
