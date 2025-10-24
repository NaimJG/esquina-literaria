const express = require('express');
const router = express.Router();
const { createUser } = require('../controllers/user-controller');

// POST /api/users - Crear un nuevo usuario
router.post('/', createUser);

module.exports = router;
