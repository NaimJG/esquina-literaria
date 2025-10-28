const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book-controller');
const reviewRoutes = require('./review-routes'); // Import review routes

// POST - Crear un nuevo libro.
router.post('/', bookController.createBook);

// GET - Obtener todos los libros.
router.get('/', bookController.getBooks);

// GET - Obtener un libro por su ID.
router.get('/:bookId', bookController.getBookById);

// Llamado a las rutas para cargar reseñas a un libro.
router.use('/:bookId/reviews', reviewRoutes);

module.exports = router;
