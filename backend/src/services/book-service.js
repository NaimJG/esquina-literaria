const Book = require("../models/Book");

const createBook = async (bookData) => {
  const { title, synopsis, author, category, genre, cover } = bookData;

  const existingBook = await Book.findOne({ title, author });

  if (existingBook) {
    const error = new Error("Ya existe un libro con el mismo título y autor.");
    error.status = 409;
    throw error;
  }

  const newBook = new Book({
    title,
    synopsis,
    author,
    category,
    genre,
    cover,
  });

  await newBook.save();
  return newBook;
};

const getAllBooks = async () => {
  const books = await Book.find()

  if (!books) {
    const error = new Error("No se encontraron libros.");
    error.status = 404;
    throw error;
  }

  const formattedBooks = books.map(book => ({
    id: book._id,
    title: book.title,
    synopsis: book.synopsis || 'N/A',
    author: book.author ? book.author : 'N/A',
    category: book.category ? book.category : 'N/A',
    genre: book.genre ? book.genre : 'N/A',
    score: book.averageScore || 0,
    cover: book.cover || 'N/A',
  }));

  return formattedBooks;
};

module.exports = { createBook, getAllBooks };