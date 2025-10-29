const express = require('express');
const router = express.Router({ mergeParams: true });
const reviewController = require('../controllers/review-controller');

// POST /books/:bookId/reviews - Crear una nueva reseña.
router.post('/', reviewController.createReview);

// GET /books/:bookId/reviews - Obtener reseñas de un libro por id.
router.get('/', reviewController.getReviewsForBook);

module.exports = router;
