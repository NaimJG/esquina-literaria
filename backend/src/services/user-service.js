const User = require("../models/User");
const bcrypt = require("bcryptjs");

const crearUsuario = async (email, username, password) => {
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
  const user = new User({ email, username, password: hashedPassword });
  await user.save();

  // Quitar el password del objeto de respuesta
  const userResponse = user.toObject();
  delete userResponse.password;

  return userResponse;
};

// Cambiar nombre de usuario
const cambiarNombreUsuario = async (id, newUsername) => {
  const existingUser = await User.findOne({ username: newUsername });
  if (existingUser) {
    const error = new Error("El nombre de usuario ya está en uso.");
    error.status = 409;
    throw error;
  }

  const user = await User.findByIdAndUpdate(
    id,
    { username: newUsername },
    { new: true }
  ).select("-password");

  if (!user) {
    const error = new Error("Usuario no encontrado.");
    error.status = 404;
    throw error;
  }

  return user;
};

// Cambiar contraseña
const cambiarPassword = async (id, oldPassword, newPassword) => {
  const user = await User.findById(id);
  if (!user) {
    const error = new Error("Usuario no encontrado.");
    error.status = 404;
    throw error;
  }

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    const error = new Error("La contraseña actual no es correcta.");
    error.status = 400;
    throw error;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);
  user.password = hashedPassword;
  await user.save();
};

module.exports = {
  crearUsuario,
  cambiarNombreUsuario,
  cambiarPassword,
};