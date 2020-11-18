const express = require('express');

const usersController = require('../controllers/users');
const jwtUtils = require('../utils/jwt');

const { UnAuthorizedError } = require('../helpers/errors');
const { OK } = require('../helpers/status_code');
const signUpRouter = require('./signUpRouter');

const signInRouter = express.Router();

signInRouter.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  const userFound = await usersController.getUserByEmail(email);

  if (userFound) {
    const isIdentified = await usersController.checkPassword(
      password,
      userFound.password,
    );
    if (isIdentified) {
      res.status(OK).json({
        token: jwtUtils.genToken(userFound),
        user: {
          firstName: userFound.firstName,
          lastName: userFound.lastName,
          email: userFound.email,
          roleAdmin: userFound.roleAdmin,
        },
      });
    } else {
      throw new UnAuthorizedError(
        'Accès refusé',
        "Votre mot de passe n'est pas correct",
      );
    }
  } else {
    throw new UnAuthorizedError(
      'Accès refusé',
      "Votre compte n'existe pas",
    );
  }
});

module.exports = signInRouter;
