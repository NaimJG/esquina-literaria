const express = require('express');
const router = express.Router({ mergeParams: true });
const reviewController = require('../controllers/review-controller');

// GET /reviews/sorted - Obtener todas las reseñas ordenadas por fecha y puntuación.
router.get('/sorted', reviewController.getSortedReviews);

// POST /books/:bookId/reviews - Crear una nueva reseña.
router.post('/', reviewController.createReview);

// GET /books/:bookId/reviews - Obtener reseñas de un libro por id.
router.get('/', reviewController.getReviewsForBook);

// GET /user/:userId/reviews Obtener reseñas de un usuario con paginación
router.get("/:userId", reviewController.getReviewsByUser);

module.exports = router;
