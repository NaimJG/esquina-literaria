const bookService = require("../services/book-service");

const createBook = async (req, res) => {
  try {
    const book = await bookService.createBook(req.body);
    res.status(201).json(book);
  } catch (err) {
    const statusCode = err.status || 500;
    res.status(statusCode).json({
      error: "No se pudo crear el libro",
      message: err.message,
    });
  }
};

const getBooks = async (req, res) => {
  try {
    const books = await bookService.getAllBooks();
    res.status(200).json({ books });
  } catch (err) {
    const statusCode = err.status || 500;
    res.status(statusCode).json({
      error: "No se pudieron obtener los libros",
      message: err.message,
    });
  }
};

const getBookById = async (req, res) => {
  const { bookId } = req.params;
  res.status(200).json({ message: `Endpoint to get book with id ${bookId}` });
};

module.exports = {
  createBook,
  getBooks,
  getBookById,
};
