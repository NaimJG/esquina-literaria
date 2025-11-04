const express = require('express');
const reviewController = require('../controllers/review-controller');
const bookReviewRouter = express.Router({ mergeParams: true });
const reviewRouter = express.Router();

// GET /reviews/sorted - Obtener todas las reseñas ordenadas por fecha y puntuación.
reviewRouter.get('/sorted', reviewController.getSortedReviews);

// POST /books/:bookId/reviews - Crear una nueva reseña.
bookReviewRouter.post('/', reviewController.createReview);

// GET /books/:bookId/reviews - Obtener reseñas de un libro por id.
bookReviewRouter.get('/', reviewController.getReviewsForBook);

// GET /reviews/:userId Obtener reseñas de un usuario con paginación
router.get("/:userId", reviewController.getReviewsByUser);

// PUT /:reviewId
router.put("/:reviewId", reviewController.updateReview);

router.delete("/:reviewId", reviewController.deleteReview);

module.exports = {
    reviewRouter,
    bookReviewRouter
};
