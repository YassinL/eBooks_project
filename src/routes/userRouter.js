const express = require('express');
const userRouter = express.Router();
const { Users } = require('../../models');
const { OK } = require('../helpers/status_code');
const { authenticateJWT } = require('../utils/jwt');

userRouter.get(
  '/user/me',
  authenticateJWT,
  async (request, response) => {
    console.log('request.user', request.user.userId);
    const user = await Users.findByPk(request.user.userId);
    response.status(OK).json(user);
  },
);

module.exports = userRouter;
