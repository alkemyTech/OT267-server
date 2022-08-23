var express = require("express");
var router = express.Router();
const { deleteSingleUser } = require("../controllers/users");
const { isAuth } = require("../middlewares/isAuth");

/* import controller */
const { getAllUsers } = require("../controllers/userController");

/* GET users */
router.get("/", getAllUsers);

router.delete("/:id", isAuth, deleteSingleUser);

module.exports = router;
