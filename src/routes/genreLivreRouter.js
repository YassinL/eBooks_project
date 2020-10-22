const { request, response } = require('express');
const express = require('express');
const genreLivreRouter = express.Router();
const {
  addGenreLivre,
  checkGenreLivre,
  getAllGenreLivre,
  getGenreLivreByName,
  getBooksByGenreLivre,
} = require('../controllers/genreLivre');
const { ConflictError, NotFoundError } = require('../helpers/errors');
const { CREATED, OK } = require('../helpers/status_code');

genreLivreRouter.get('/genre', async (request, response) => {
  const genreLivre = await getAllGenreLivre();
  response.status(OK).json(genreLivre);
});

// Récupérer tous les livres par le nom d'unn genre
genreLivreRouter.get(
  '/books/genre-livre/:name',
  async (request, response) => {
    const genreLivre = await getBooksByGenreLivre(
      request.params.name,
    );
    if (genreLivre.length === 0) {
      throw new NotFoundError(
        'Ressource introuvable',
        'Aucun livres trouvés ',
      );
    }
    response.status(OK).json(genreLivre);
  },
);

genreLivreRouter.post('/genre', async (request, response) => {
  const genreLivreFound = await checkGenreLivre(name);

  if (genreLivreFound === null) {
    const newGenreLivre = await addGenreLivre(request.body);
    response.status(CREATED).json(newGenreLivre);
  } else {
    throw new ConflictError(
      'Conflit',
      'Ce genre de livre est déjà enregistré ',
    );
  }
});
module.exports = genreLivreRouter;
