const express = require('express');

const router = express.Router();
const rolesController = require('../controllers/roles');

router.get('/', rolesController.getAllRoles);
router.get('/:roleId', rolesController.getRoleById);
router.post('/', rolesController.create);
router.put('/:roleId', rolesController.update);
router.delete('/:roleId', rolesController.delete);

module.exports = router;
