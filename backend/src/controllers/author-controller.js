const Author = require('../models/Author');

const createAuthor = async (req, res) => {
  const { name, biography } = req.body;

  try {
    const author = new Author({
      name,
      biography,
    });

    const createdAuthor = await author.save();
    res.status(201).json(createdAuthor);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getAuthors = async (req, res) => {
  try {
    const authors = await Author.find({});
    res.json(authors);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = {
  createAuthor,
  getAuthors,
};