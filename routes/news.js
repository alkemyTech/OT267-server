const express = require('express');

const router = express.Router();
const { updateANews } = require('../controllers/news');
const { isAuth } = require('../middlewares/isAuth');
const { isAdmin } = require('../middlewares/isAdmin');
const { checkCategoryExist } = require('../validators/news');

router.get('/', (req, res) => res.json('respond with a resource from news'));
router.put('/:id', isAuth, isAdmin, checkCategoryExist, updateANews);

module.exports = router;
