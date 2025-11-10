const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./src/config/db");
const userRoutes = require('./src/routes/user-routes');
const authRoutes = require('./src/routes/auth-routes');
const bookRoutes = require('./src/routes/book-routes');
const authorRoutes = require('./src/routes/author-routes');
const categoryRoutes = require('./src/routes/category-routes');
const genreRoutes = require('./src/routes/genre-routes');
const { reviewRouter } = require('./src/routes/review-routes');

dotenv.config();
connectDB();

const app = express();

const allowedOrigins = [
  "http://localhost:3000", // desarrollo
  "https://esquina-literaria.vercel.app" // producción
];

// Middlewares
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json());

// Rutas de prueba
app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/books', bookRoutes);
app.use('/authors', authorRoutes);
app.use('/categories', categoryRoutes);
app.use('/genres', genreRoutes);
app.use('/reviews', reviewRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));

