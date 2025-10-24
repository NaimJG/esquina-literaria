const User = require("../models/User");
const bcrypt = require("bcryptjs");

const createUser = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });

        if (existingUser) {
            const field = existingUser.email === email ? 'email' : 'username';
            const message = `El ${field} ya se encuentra registrado.`;
            return res.status(409).json({
                message,
                field
            });
        }

        const salt = await bcrypt.genSalt(10); // Genera el "salt" con 10 rondas de complejidad
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({ email, username, password: hashedPassword, role: 'user' });
        await user.save();

        const userResponse = user.toObject();
        delete userResponse.password;

        res.status(201).json(userResponse);

    } catch (err) {
        res.status(500).json({
            error: "El usuario no se pudo crear correctamente",
            message: err.message,
        });
    }
};

module.exports = {
    createUser,
};