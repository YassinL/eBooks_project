const { v4: uuidv4 } = require('uuid');
const models = require('../../models');
const { Books, GenreLivres, Order } = models;

module.exports = {
  addOrder: () => {},
  getOrder: (id) => {
    return Order.findByPk(id, { include: ['books'] });
  },
  updateOrder: (data) => {
    // create a new row object with the updated values you want
    const updatedRow = Object.assign({}, req.body, {
      quantity: req.body.quantity++,
    });

    // "upsert" that new row
    Order.upsert(updatedRow)
      .then(() => res.sendStatus(204))
      .catch(next);
  },
};
