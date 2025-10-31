const express = require('express');
const router = express.Router();
const { createAuthor, getAuthors } = require('../controllers/author-controller');
const adminAuth = require('../middleware/admin-auth');

router.route('/').post(adminAuth, createAuthor).get(getAuthors);

module.exports = router;
