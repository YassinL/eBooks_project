const models = require('../../models');
const { GenreLivres } = models;

module.exports = {
  getGenreLivreById: (id) => {
    return GenreLivres.findByPk(id, {
      attributes: ['name'],
    });
  },

  getGenreLivreByName: (name) => {
    return GenreLivres.findOne({
      where: {
        name: name,
      },
      attributes: ['id', 'name'],
    });
  },
};
