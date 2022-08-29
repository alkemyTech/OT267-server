const express = require('express');
const { deleteSingleNews } = require('../controllers/news');
const { validateNewsById } = require('../middlewares/news');

const router = express.Router();

router.get('/', (req, res) => res.json('respond with a resource from news'));

router.delete('/:id', validateNewsById, deleteSingleNews);
module.exports = router;
