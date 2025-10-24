const authService = require("../services/auth-service");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await authService.login(username, password);

    res.status(200).json(result); // result incluirá el token y la info necesaria
  } catch (err) {
    const statusCode = err.status || 500;
    res.status(statusCode).json({
      error: "No se pudo iniciar sesión",
      message: err.message,
    });
  }
};

module.exports = {
  login,
};