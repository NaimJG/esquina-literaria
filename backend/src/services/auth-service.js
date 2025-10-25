const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const login = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) {
    const error = new Error("Usuario o contraseña incorrectos");
    error.status = 404;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const error = new Error("Usuario o contraseña incorrectos");
    error.status = 401;
    throw error;
  }

  const token = jwt.sign(
    { id: user._id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );

  const userResponse = user.toObject();
  delete userResponse.password;

  return {
    message: "Login exitoso",
    token,
    user: userResponse,
  };
};

module.exports = {
  login,
};