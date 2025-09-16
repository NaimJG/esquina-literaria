const express = require("express");
// const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas de prueba
app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

// Conexión a MongoDB
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("MongoDB conectado");
//     app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
//   })
//   .catch((err) => console.error(err));