const express = require('express');
const booksRouter = express.Router();

const { authenticateJWT } = require('../utils/jwt');
const { upload } = require('../middlewares');
const {
  addBook,
  getAllBooks,
  getBook,
  deleteBook,
  updateBook,
  getSomeBooks,
} = require('../controllers/books');
const {
  getGenreLivreById,
  getGenreLivreByName,
} = require('../controllers/genreLivre');
const {
  BadRequestError,
  NotFoundError,
  UnAuthorizedError,
} = require('../helpers/errors');
const { CREATED, OK } = require('../helpers/status_code');
const { request, response } = require('express');

const NOSTRING_REGEX = /^\d+$/;

booksRouter.get('/books', async (request, response) => {
  console.log(request.query);

  const books = await getAllBooks(request.query);
  if (books.length === 0 || books === null) {
    throw new NotFoundError(
      'Ressources introuvables',
      "Ce livre n'existe pas ",
    );
  }
  response.status(OK).json(books);
});
// genreLivreId: findGenre.name,
booksRouter.get('/books/:title', async (request, response) => {
  const books = await getBook(request.params.title);
  if (!books) {
    throw new NotFoundError(
      'Ressource introuvable',
      "Ce livre n'existe pas",
    );
  }
  response.status(OK).json(books);
});

booksRouter.get('/random-books', async (request, response) => {
  const books = await getSomeBooks();
  // const randomBooks = Math.floor(Math.random() * books);
  if (books.length === 0 || books === null) {
    throw new NotFoundError(
      'Ressources introuvables',
      "Ce livre n'existe pas ",
    );
  }
  response.status(OK).json(books);
});

booksRouter.post(
  '/books',
  authenticateJWT,
  upload,
  async (request, response) => {
    // const books = JSON.parse(request.body.books);
    // console.log(books);
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

    const host = request.get('host');
    const { filename } = request.file;

    const bookAdd = {
      ...request.body,
      uploadPicture: `${request.protocol}://${host}/uploads/${filename}`,
    };
    const newBook = await addBook(bookAdd);

    return response.status(CREATED).json(newBook);
  },
);

// Update Book
booksRouter.put(
  '/books/:title',
  authenticateJWT,
  upload,
  async (request, response) => {
    const { roleAdmin } = request.user;
    if (roleAdmin === false) {
      throw new UnAuthorizedError(
        'Accès non autorisé',
        'Vous devez être admin pour modifier une annonce de livre',
      );
    }
    if (request.file) {
      const host = request.get('host');
      const { filename } = request.file;
      request.body.uploadPicture = `${request.protocol}://${host}/uploads/${filename}`;
    }
    const updateBooks = await updateBook(
      request.params.title,
      request.body,
    );
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
        'Vous devez être admin pour supprimer une annonce de livre',
      );
    }

    await deleteBook(request.params.title);
    response
      .status(OK)
      .json({ message: "L'annonce de livre a été supprimé" });
  },
);

module.exports = booksRouter;
