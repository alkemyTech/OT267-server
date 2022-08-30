const {
  allActivities,
  newActivity,
} = require('../services/activity');

const getAllActivities = async (req, res) => {
  try {
    const data = await allActivities();

    if (data) res.status(200).json({ message: 'All activities', data });
    else res.status(404).json({ message: 'Activities not found' });
  } catch (error) {
    res.status(500).json({ message: 'server error', error });
  }
};

const createActivity = async (req, res) => {
  const {
    name, content, image,
  } = req.body;
  try {
    const data = await newActivity(name, content, image);

    res.status(201).json({
      message: 'activity created',
      data,
    });
  } catch (error) {
    res.status(500).json({ message: 'server error', error });
  }
};

module.exports = { getAllActivities, createActivity };
