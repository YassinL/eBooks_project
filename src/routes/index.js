const express = require('express');
const router = express.Router();

const signUpRouter = require('./signUp');
const booksRouter = require('./booksRouter');

const bodyParser = require('body-parser');

// Middleware
router.use(bodyParser.json());

//Page accueil
router.get('/', (request, response) => {
  response.json({ message: 'Hello Books' });
});

// Routes
router.use('/api', signUpRouter);
router.use('/api', booksRouter);

module.exports = router;
