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

const getSortedReviews = async () => {
  const reviews = await Review.find({}).sort({ scoreDate: -1, score: -1 }).populate('user', 'username').populate('book', 'title');
  return reviews;
};

const getReviewsByUser = async (userId, page = 1, limit = 5) => {
  const skip = (page - 1) * limit;

  const [reviews, total] = await Promise.all([
    Review.find({ user: userId })
      .populate('book', 'title author cover synopsis genre category score')
      .sort({ scoreDate: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Review.countDocuments({ user: userId }),
  ]);

  return {
    reviews,
    totalPages: Math.ceil(total / limit) || 1,
    totalReviews: total,
  };
};

const updateReview = async (reviewId, updatedData) => {
  const review = await Review.findById(reviewId);
  if (!review) throw new Error("La reseña no existe.");

  if (updatedData.comment !== undefined) review.comment = updatedData.comment;
  if (updatedData.score !== undefined) review.score = updatedData.score;
  review.scoreDate = updatedData.scoreDate || new Date();

  await review.save();
  return review;
};

const deleteReview = async (reviewId) => {
  const review = await Review.findById(reviewId);
  if (!review) throw new Error("La reseña no existe.");

  await Book.findByIdAndUpdate(review.book, {
    $pull: { reviews: review._id },
  });

  await Review.findByIdAndDelete(reviewId);
  return true;
};

module.exports = { createReview, getReviewsForBook, getSortedReviews, getReviewsByUser, updateReview, deleteReview };
