const { getNew } = require('../services/news');

const getNewById = async (req, res) => {
  const { id } = req.params;

  if (!Number(id)) return res.status(400).json({ message: 'You need to pass an id' });

  let newDetail;
  try {
    newDetail = await getNew(id);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  if (!newDetail) return res.status(404).json({ message: 'New not found' });

  return res.status(200).json({ message: 'New requested succesfully', data: newDetail });
};

module.exports = {
  getNewById,
};
