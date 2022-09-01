const { Router } = require('express');

const router = Router();
const { isAuth } = require('../middlewares/isAuth');
const { isAdmin } = require('../middlewares/isAdmin');
const { updateSlide } = require('../controllers/slides');

router.put('/:id', isAuth, isAdmin, updateSlide);

module.exports = router;
