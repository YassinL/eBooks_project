const express = require('express');
require('express-async-errors');
const booksRouter = express.Router();

const { authenticateJWT } = require('../utils/jwt');
const upload = require('../middlewares/upload');
const {
  addBook,
  getAllBooks,
  getBook,
  deleteBook,
  updateBook,
} = require('../controllers/books');
const { getGenreLivreById } = require('../controllers/genreLivre');
const {
  BadRequestError,
  NotFoundError,
  UnAuthorizedError,
} = require('../helpers/errors');
const { CREATED, OK } = require('../helpers/status_code');
const { request, response } = require('express');

const NOSTRING_REGEX = /^\d+$/;

booksRouter.get('/books', async (request, response) => {
  console.log('console log de request.query:', request.query);
  const books = await getAllBooks(
    request.query.title || request.query.name,
  );
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
  authenticateJWT,
  upload.single('photo'),
  async (request, response) => {
    const { ISBN, summary } = request.body;
    const { roleAdmin } = request.user;

    if (roleAdmin === false) {
      throw new UnAuthorizedError(
        'Accès non autorisé',
        'Vous devez être admin pour poster une annonce de livre',
      );
    }
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
    const genreLivreFound = await getGenreLivreById(
      request.body.genreLivreId,
    );
    // const uploadPicture = await booksController.addBook(request.file);
    console.log('console log de GenreLivre :', genreLivreFound);
    return response.status(CREATED).json({
      id: newBook.id,
      ISBN: newBook.ISBN,
      title: newBook.title,
      summary: newBook.summary,
      author: newBook.author,
      publicationDate: newBook.publicationDate,
      pagesNumber: newBook.pagesNumber,
      language: newBook.language,
      genreLivreId: genreLivreFound.name,
      // photo: uploadPicture.path,
    });
  },
);

// Update a Book
booksRouter.put(
  '/books/:bookId',
  authenticateJWT,
  async (request, response) => {
    console.log('console log de :', request.body, request.params);
    const { roleAdmin } = request.user;
    if (roleAdmin === false) {
      throw new UnAuthorizedError(
        'Accès non autorisé',
        'Vous devez être admin pour poster une annonce de livre',
      );
    }
    const { bookId } = request.params;
    const data = request.body;
    const updateBooks = await updateBook(bookId, data);

    if (!updateBooks) {
      throw new NotFoundError();
    }
    response.status(OK).json({
      updateBooks,
      message: "l'annonce de livre à bien été modifié",
    });
  },
);

// Delete a Book
booksRouter.delete(
  '/books/:title',
  authenticateJWT,
  async (request, response) => {
    const { roleAdmin } = request.user;
    if (roleAdmin === false) {
      throw new UnAuthorizedError(
        'Accès non autorisé',
        'Vous devez être admin pour poster une annonce de livre',
      );
    }

    const deleteBooks = await deleteBook(request.params.title);
    if (!deleteBooks) {
      throw new NotFoundError();
    }
    response
      .status(OK)
      .json({ message: "L'annonce de livre a été supprimé" });
  },
);

module.exports = booksRouter;
