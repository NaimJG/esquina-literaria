const reviewService = require("../services/review-service");

const createReview = async (req, res) => {
  const { bookId } = req.params;
  // The userId should come from the authenticated user's session or token.
  // For now, let's assume it's in the request body for simplicity.
  const { userId, score, comment } = req.body;

  try {
    const newReview = await reviewService.createReview(bookId, userId, score, comment);
    res.status(201).json(newReview);
  } catch (err) {
    const statusCode = err.status || 500;
    res.status(statusCode).json({
      error: "No se pudo crear la reseña",
      message: err.message,
    });
  }
};

const getReviewsForBook = async (req, res) => {
  const { bookId } = req.params;

  try {
    const reviews = await reviewService.getReviewsForBook(bookId);
    res.status(200).json(reviews);
  } catch (err) {
    const statusCode = err.status || 500;
    res.status(statusCode).json({
      error: "No se pudieron obtener las reseñas",
      message: err.message,
    });
  }
};

const getSortedReviews = async (req, res) => {
  try {
    const reviews = await reviewService.getSortedReviews();
    res.status(200).json(reviews);
  } catch (err) {
    const statusCode = err.status || 500;
    res.status(statusCode).json({
      error: "No se pudieron obtener las reseñas ordenadas",
      message: err.message,
    });
  }
};

module.exports = {
  createReview,
  getReviewsForBook,
  getSortedReviews,
};
