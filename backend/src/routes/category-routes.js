const express = require('express');
const router = express.Router();
const { createCategory, getCategories } = require('../controllers/category-controller');
const adminAuth = require('../middleware/admin-auth');

router.route('/').post(adminAuth, createCategory).get(getCategories);

module.exports = router;
