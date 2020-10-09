const express = require('express');
require('express-async-errors');
const router = express.Router();

const signUpRouter = require('./signUpRouter');
const signInRouter = require('./signInRouter');
const booksRouter = require('./booksRouter');
const orderRouter = require('./orderRouter');
const genreLivreRouter = require('./genreLivreRouter');
const nodemailerRouter = require('./nodemailerRouter');
const userRouter = require('./userRouter');
// Routes
router.use(signUpRouter);
router.use(signInRouter);
router.use(booksRouter);
router.use(genreLivreRouter);
router.use(orderRouter);
router.use(nodemailerRouter);
router.use(userRouter);

module.exports = router;
