const models = require('../../models');
const { GenreLivres } = models;

module.exports = {
  addGenreLivre: (props) => {
    const { name } = props;
    return GenreLivres.create(name);
  },

  checkGenreLivre: (name) => {
    return GenreLivres.findOne({
      attributes: ['name'],
      where: { name: name },
    });
  },

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
    });
  },
};
