const User = require("../models/User");
const bcrypt = require("bcryptjs");

const crearUsuario = async (email, username, password) => {
  // Verificar si ya existe el usuario
  const existingUser = await User.findOne({ $or: [{ email }, { username }] });

  if (existingUser) {
    const field = existingUser.email === email ? "email" : "username";
    const message = `El ${field} ya se encuentra registrado.`;

    const error = new Error(message);
    error.status = 409;
    error.field = field;
    throw error;
  }

  // Hashear contraseña
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Crear usuario
  const user = new User({ email, username, password: hashedPassword, role: "user" });
  await user.save();

  // Quitar el password del objeto de respuesta
  const userResponse = user.toObject();
  delete userResponse.password;

  return userResponse;
};

module.exports = {
  crearUsuario,
};