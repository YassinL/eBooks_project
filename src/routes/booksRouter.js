const express = require('express');
require('express-async-errors');
const booksRouter = express.Router();

const upload = require('../middlewares/upload');
const {
  addBook,
  getAllBooks,
  getBook,
  deleteBook,
  updateBook,
} = require('../controllers/books');
const {
  BadRequestError,
  NotFoundError,
} = require('../helpers/errors');
const { CREATED, OK } = require('../helpers/status_code');
const { request, response } = require('express');

const NOSTRING_REGEX = /^\d+$/;

booksRouter.get('/books', async (request, response) => {
  const books = await getAllBooks();
  response.status(OK).json(books);
});

booksRouter.get('/books/:title', async (request, response) => {
  console.log('CONSOLE LOG DE :', request.params);
  const books = await getBook(request.params.title);
  if (!books) {
    throw new NotFoundError(
      'Ressource introuvable',
      "Ce livre n'existe pas",
    );
  }
  response.status(OK).json(books);
});

booksRouter.post(
  '/books',
  upload.single('photo'),
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
    console.log('console log de request.file :', request.file.path);
    const newBook = await addBook(request.body);
    // const uploadPicture = await booksController.addBook(request.file);

    return response.status(CREATED).json({
      id: newBook.id,
      ISBN: newBook.ISBN,
      title: newBook.title,
      summary: newBook.summary,
      author: newBook.author,
      publicationDate: newBook.publicationDate,
      pagesNumber: newBook.pagesNumber,
      language: newBook.language,
      // photo: uploadPicture.path,
    });
  },
);

// Ne fonctionne pas encore, problèmes
booksRouter.put('/books/:title', async (request, response) => {
  const updateBooks = await updateBook(
    request.body,
    request.params.title,
  );
  if (!updateBooks) {
    throw new NotFoundError();
  }
  response.status(OK).json(updateBooks);
});

booksRouter.delete('/books/:title', async (request, response) => {
  const deleteBooks = await deleteBook(request.params.title);
  if (!deleteBooks) {
    throw new NotFoundError();
  }
  response
    .status(OK)
    .json({ message: "L'annonce de livre a été supprimé" });
});

module.exports = booksRouter;
