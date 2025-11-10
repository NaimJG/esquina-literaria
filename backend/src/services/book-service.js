const Book = require("../models/Book");
const Category = require("../models/Category");
const Genre = require("../models/Genre");
const Author = require("../models/Author");

const createBook = async (bookData) => {
  const { title, synopsis, author, category, genre, cover, publishDate } = bookData;

  const existingBook = await Book.findOne({ title, author });

  if (existingBook) {
    const error = new Error("Ya existe un libro con el mismo título y autor.");
    error.status = 409;
    throw error;
  }

  let authorDoc = await Author.findOne({ name: author });
  if (!authorDoc) {
    authorDoc = new Author({ name: author });
    await authorDoc.save();
  }

  let categoryDoc = await Category.findOne({ name: category });
  if (!categoryDoc) {
    categoryDoc = new Category({ name: category });
    await categoryDoc.save();
  }

  // Verificar o crear Genre
  let genreDoc = await Genre.findOne({ name: genre });
  if (!genreDoc) {
    genreDoc = new Genre({ name: genre });
    await genreDoc.save();
  }

  // Crear el libro con las referencias
  const newBook = new Book({
    title,
    synopsis,
    author: authorDoc.name,
    category: categoryDoc.name,
    genre: genreDoc.name,
    cover,
    publishDate,
  });

  await newBook.save();
  return newBook;
};

const getAllBooks = async () => {
  const books = await Book.find().populate({
    path: 'reviews',
    populate: {
      path: 'user',
      select: 'username'
    }
  });

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
    publishDate: book.publishDate || null,
    reviewCount: book.reviews?.length || 0,
  }));

  return formattedBooks;
};

const getBookById = async (bookId) => {
  const book = await Book.findById(bookId).populate({
    path: 'reviews',
    populate: {
      path: 'user',
      select: 'username'
    }
  });
  
  if (!book) {
    const error = new Error("No se encontró un libro con ese ID.");
    error.status = 404;
    throw error;
  }

  const formattedBook = ({
    id: book._id,
    title: book.title,
    synopsis: book.synopsis || 'N/A',
    author: book.author ? book.author : 'N/A',
    category: book.category ? book.category : 'N/A',
    genre: book.genre ? book.genre : 'N/A',
    score: book.averageScore || 0,
    cover: book.cover || 'N/A',
    publishDate: book.publishDate,
    reviews: book.reviews
  });

  return formattedBook;
};

module.exports = { createBook, getAllBooks, getBookById };