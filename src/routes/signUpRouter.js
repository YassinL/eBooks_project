const express = require('express');
const signUpRouter = express.Router();
require('express-async-errors');
const usersController = require('../controllers/users');

const {
  BadRequestError,
  ConflictError,
} = require('../helpers/errors');
const { CREATED } = require('../helpers/status_code');

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*\d).{4,8}$/;

signUpRouter.post('/signup', async (request, response) => {
  const {
    firstName,
    lastName,
    email,
    password,
    birthday,
    phoneNumber,
  } = request.body;

  if (
    firstName === '' ||
    lastName === '' ||
    email === '' ||
    password === '' ||
    birthday === '' ||
    phoneNumber === ''
  ) {
    throw new BadRequestError(
      'Requête incorrecte',
      'Certains champs ne sont pas renseignés',
    );
  }

  if (typeof firstName !== 'string') {
    throw new BadRequestError(
      'Requête incorrecte',
      'Le champ first name doit être une chaîne de caractères',
    );
  }
  if (!EMAIL_REGEX.test(email)) {
    throw new BadRequestError(
      'Mauvaise requête',
      "l'email n'est pas valide",
    );
  }
  if (!PASSWORD_REGEX.test(password)) {
    throw new BadRequestError(
      'Mauvaise requête',
      'mot de pass invalide (doit avoir une longueur de 4 à 8 caractère et inclure au moins 1 chiffre)',
    );
  }

  const userFound = await usersController.checkEmail(email);
  if (userFound === null) {
    const newUser = await usersController.addUser(request.body);

    response.status(CREATED).json({ newUser });
  } else {
    throw new ConflictError(
      'Conflit',
      'Un utilisateur utilisant cette adresse email est déjà enregistré',
    );
  }
});

module.exports = signUpRouter;
