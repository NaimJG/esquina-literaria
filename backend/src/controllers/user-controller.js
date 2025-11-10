const userService = require("../services/user-service");

const createUser = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const newUser = await userService.crearUsuario(email, username, password);
    res.status(201).json(newUser);
  } catch (err) {
    const statusCode = err.status || 500;
    res.status(statusCode).json({
      error: "No se pudo crear el usuario",
      message: err.message,
    });
  }
};

// Cambiar email
const updateEmail = async (req, res) => {
  const { id } = req.params;
  const { newEmail } = req.body;

  try {
    const updatedUser = await userService.cambiarEmail(id, newEmail);
    res.json(updatedUser);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};


// Cambiar nombre de usuario
const updateUsername = async (req, res) => {
  const { id } = req.params;
  const { newUsername } = req.body;

  try {
    const updatedUser = await userService.cambiarNombreUsuario(id, newUsername);
    res.json(updatedUser);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

// Cambiar contraseña
const updatePassword = async (req, res) => {
  const { id } = req.params;
  const { oldPassword, newPassword } = req.body;

  try {
    await userService.cambiarPassword(id, oldPassword, newPassword);
    res.json({ message: "Contraseña actualizada correctamente" });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

module.exports = { createUser, updateEmail, updateUsername, updatePassword };