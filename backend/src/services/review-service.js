const Book = require("../models/Book");
const Review = require("../models/Review");
const User = require("../models/User");

const createReview = async (bookId, userId, score, comment) => {
  const existingReview = await Review.findOne({ book: bookId, user: userId });
  if (existingReview) {
    const error = new Error('Ya has reseñado este libro.');
    error.status = 409;
    throw error;
  }
  
  const book = await Book.findById(bookId);
  if (!book) {
    const error = new Error("No se encontró libro con ese id.");
    error.status = 404;
    throw error;
  }

  const user = await User.findById(userId);
  if (!user) {
    const error = new Error("Error al recuperar el usuario.");
    error.status = 404;
    throw error;
  }

  const newReview = new Review({
    book: bookId,
    user: userId,
    score,
    comment,
  });
  await newReview.save();

  book.reviews.push(newReview._id);
  await book.save();

  return newReview;
};

const getReviewsForBook = async (bookId) => {
  const book = await Book.findById(bookId);
  if (!book) {
    const error = new Error("No se encontró un libro con ese id.");
    error.status = 404;
    throw error;
  }

  const reviews = await Review.find({ book: bookId }).populate('user', 'username');
  return reviews;
};

module.exports = { createReview, getReviewsForBook };
