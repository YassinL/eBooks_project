const models = require('../../models');
const { GenreLivres, Books } = models;

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

  getAllGenreLivre: () => {
    return GenreLivres.findAll({
      attributes: ['name'],
    });
  },

  getBooksByGenreLivre: (name) => {
    return Books.findAll({
      include: [
        {
          model: GenreLivres,
          attributes: ['name'],
          where: {
            name: name,
          },
        },
      ],
    });
  },
};
