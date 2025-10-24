const User = require("../models/User");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "Usuario o contraseña incorrectos" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Usuario o contraseña incorrectos" });
        }

        // 3. Si todo es correcto, generas un token (JWT) y lo envías
        // ... (lógica para crear un JSON Web Token)

        res.status(200).json({ message: "Login exitoso!" /*, token */ });

    } catch (err) {
        res.status(500).json({ message: "Error en el servidor" });
    }
};

module.exports = {
    login,
};