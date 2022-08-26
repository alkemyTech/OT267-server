const { updateByPk } = require('../services/activity');

const updateActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await updateByPk(id, req.body);

    return response
      ? res.status(200).json({ message: 'Activity updated successfuly', data: response })
      : res.status(404).json({ message: 'Activity not found' });
  } catch (e) {
    return res.status(500).json({ message: 'Error: Something went wrong, please try again later.' });
  }
};

module.exports = {
  updateActivity,
};
