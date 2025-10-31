const express = require('express');
const router = express.Router();
const { createGenre, getGenres } = require('../controllers/genre-controller');
const adminAuth = require('../middleware/admin-auth');

router.route('/').post(adminAuth, createGenre).get(getGenres);

module.exports = router;
