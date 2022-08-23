const express = require('express');
const router = express.Router();
const { login } = require('../controllers/users');
const { deleteSingleUser } = require('../controllers/users');
const { getAllUsers } = require('../controllers/userController');
const { deleteSingleUser } = require("../controllers/users");
const { isAuth } = require("../middlewares/isAuth");
const { isAdmin } = require("../middlewares/isAdmin");
const { getAllUsers } = require("../controllers/userController"); 

router.get('/', getAllUsers);

router.post('/auth/login', login);

router.delete('/:id', deleteSingleUser);

router.get("/", getAllUsers);

router.delete("/:id", deleteSingleUser);

module.exports = router;
