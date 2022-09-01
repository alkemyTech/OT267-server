const { Router } = require('express');

const router = Router();
const { isAuth } = require('../middlewares/isAuth');
const { isAdmin } = require('../middlewares/isAdmin');
const { deleteSlide } = require('../controllers/slides');

router.delete('/:id', isAuth, isAdmin, deleteSlide);

module.exports = router;
