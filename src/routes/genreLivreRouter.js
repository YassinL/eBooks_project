const express = require('express');
const genreLivreRouter = express.Router();
const {
  addGenreLivre,
  checkGenreLivre,
} = require('../controllers/genreLivre');
const { ConflictError } = require('../helpers/errors');
const { CREATED } = require('../helpers/status_code');

genreLivreRouter.post('/genre-livre', async (request, response) => {
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
