var express = require("express");
var router = express.Router();
const { deleteSingleUser } = require("../controllers/users");
const { isAuth } = require("../middlewares/isAuth");
const { isAdmin } = require("../middlewares/isAdmin");

/* import controller */
const { getAllUsers } = require("../controllers/userController");

/* GET users */
router.get("/", getAllUsers);

router.delete("/:id", deleteSingleUser);

module.exports = router;
