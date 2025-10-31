const Genre = require('../models/Genre');

const createGenre = async (req, res) => {
  const { name } = req.body;

  try {
    const genre = new Genre({
      name,
    });

    const createdGenre = await genre.save();
    res.status(201).json(createdGenre);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getGenres = async (req, res) => {
  try {
    const genres = await Genre.find({});
    res.json(genres);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = {
  createGenre,
  getGenres,
};