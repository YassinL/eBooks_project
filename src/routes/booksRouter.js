const express = require('express');
require('express-async-errors');
const booksRouter = express.Router();

const uploadImage = require('../middlewares/uploadImage');
const booksController = require('../controllers/books');
const { BadRequestError } = require('../helpers/errors');
const { CREATED } = require('../helpers/status_code');

const NOSTRING_REGEX = /^\d+$/;

booksRouter.get('/books', (request, response) => {
  response.json({ message: 'We are in the books section' });
});

booksRouter.post(
  '/books',
  uploadImage.single('photo'),
  async (request, response) => {
    const { ISBN, summary } = request.body;
    if (!NOSTRING_REGEX.test(ISBN)) {
      throw new BadRequestError(
        'Mauvaise requête',
        'Le champ doit être un nombre entier',
      );
    }
    if (summary === null || summary === undefined || summary === '') {
      throw new BadRequestError(
        'Mauvaise requête',
        "Le champ résumé n'est pas renseigné",
      );
    }
    console.log('console log de request.fil :', request.file);
    const newBook = await booksController.addBook(request.body);

    const uploadPicture = await booksController.addBook(
      request.file.buffer,
    );

    return response.status(CREATED).json({
      id: newBook.id,
      ISBN: newBook.ISBN,
      title: newBook.title,
      summary: newBook.summary,
      author: newBook.author,
      publicationDate: newBook.publicationDate,
      pagesNumber: newBook.pagesNumber,
      language: newBook.language,
      photo: uploadPicture.photo,
    });
  },
);

module.exports = booksRouter;
