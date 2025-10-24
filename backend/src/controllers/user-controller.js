const userService = require("../services/user-service");

const createUser = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const newUser = await userService.crearUsuario(email, username, password);
    res.status(201).json(newUser);
  } catch (err) {
    // Si el service lanza un error con código, lo usamos
    const statusCode = err.status || 500;
    res.status(statusCode).json({
      error: "No se pudo crear el usuario",
      message: err.message,
    });
  }
};

module.exports = {
  createUser,
};