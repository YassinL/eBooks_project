const express = require('express');
require('express-async-errors');
const router = express.Router();

const signUpRouter = require('./signUpRouter');
const signInRouter = require('./signInRouter');
const booksRouter = require('./booksRouter');
const orderRouter = require('./orderRouter');
const genreLivreRouter = require('./genreLivreRouter');

// Routes
router.use(signUpRouter);
router.use(signInRouter);
router.use(booksRouter);
router.use(genreLivreRouter);
router.use(orderRouter);

module.exports = router;
