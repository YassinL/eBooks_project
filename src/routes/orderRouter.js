const express = require('express');
const orderRouter = express.Router();

orderRouter.get('/order', async (request, response) => {
  response.send(' GET order');
});

orderRouter.post('/order', async (request, response) => {
  response.send(' POST order');
});
module.exports = orderRouter;
