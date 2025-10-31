const Category = require('../models/Category');

const createCategory = async (req, res) => {
  const { name } = req.body;

  try {
    const category = new Category({
      name,
    });

    const createdCategory = await category.save();
    res.status(201).json(createdCategory);
  } catch (error) {
    res.status(500).json({ message: error})
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = {
  createCategory,
  getCategories,
};