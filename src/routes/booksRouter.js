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
  // const genreLivreName = await getGenreLivreByName(
  //   request.query.name,
  // );
  const books = await getAllBooks(
    request.query.title ||
      request.query.genreLivreId ||
      request.query.author,
  );
  if (books.length === 0 || books === null) {
    throw new NotFoundError(
      'Ressources introuvables',
      "Ce livre n'existe pas ",
    );
  }
  response.status(OK).json(books);
});

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

booksRouter.post(
  '/books',
  authenticateJWT,
  upload,
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

    const host = request.get('host');
    const { filename } = request.file;

    const newBook = await addBook({
      ...request.body,
      uploadPicture: `${request.protocol}://${host}/uploads/${filename}`,
    });

    const genreLivreFound = await getGenreLivreById(
      request.body.genreLivreId,
    );

    return response.status(CREATED).json({
      ISBN: newBook.ISBN,
      title: newBook.title,
      summary: newBook.summary,
      author: newBook.author,
      publicationDate: newBook.publicationDate,
      pagesNumber: newBook.pagesNumber,
      genreLivreId: genreLivreFound.name,
      uploadPicture: `${request.protocol}://${host}/uploads/${filename}`,
    });
  },
);

// Update a Book
// booksRouter.put(
//   '/books/:bookId',
//   authenticateJWT,
//   async (request, response) => {
//     const { roleAdmin } = request.user;
//     if (roleAdmin === false) {
//       throw new UnAuthorizedError(
//         'Accès non autorisé',
//         'Vous devez être admin pour modifier une annonce de livre',
//       );
//     }
//     const { bookId } = request.params;
//     const data = request.body;
//     const updateBooks = await updateBook(bookId, data);

//     if (!updateBooks) {
//       throw new NotFoundError();
//     }
//     response.status(OK).json({
//       updateBooks,
//       message: "l'annonce de livre à bien été modifié",
//     });
//   },
// );

booksRouter.put(
  '/books/:bookId',
  authenticateJWT,
  async (request, response) => {
    const { roleAdmin } = request.user;
    if (roleAdmin === false) {
      throw new UnAuthorizedError(
        'Accès non autorisé',
        'Vous devez être admin pour modifier une annonce de livre',
      );
    }
    const updateBooks = await updateBook(
      request.body,
      request.params.bookId,
    );
    if (!updateBooks) {
      throw new NotFoundError();
    }
    response.status(OK).json({
      updateBooks,
      // genreLivreId: updateBook.GenreLivre.name,
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
