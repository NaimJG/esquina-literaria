const express = require('express');
const router = express.Router();
const { createUser, updateUsername, updatePassword } = require('../controllers/user-controller');

// POST /users - Crear un nuevo usuario
router.post('/', createUser);

// PUT /users/:id/username - Cambiar nombre de usuario
router.put('/:id/username', updateUsername);

// PUT /users/:id/password - Cambiar contraseña
router.put('/:id/password', updatePassword);

module.exports = router;
