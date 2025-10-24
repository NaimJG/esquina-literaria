const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./src/config/db");
const userRoutes = require('./src/routes/user-routes');
const authRoutes = require('./src/routes/auth-routes');

dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas de prueba
app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

app.use('/users', userRoutes);
app.use('/auth', authRoutes);

// Conexión a MongoDB
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));

