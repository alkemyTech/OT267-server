const express = require('express');

const router = express.Router();

const {
  getAllRoles, getRoleById, createRole, updateRole, deleteRole,
} = require('../controllers/roles');

router.get('/', getAllRoles);
router.get('/:id', getRoleById);
router.post('/', createRole);
router.put('/:id', updateRole);
router.delete('/:id', deleteRole);

module.exports = router;
