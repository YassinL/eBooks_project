const { v4: uuidv4 } = require('uuid');
const models = require('../../models');
const { Books, GenreLivres } = models;
const { Op } = require('sequelize');

const booksAttributes = [
  'ISBN',
  'title',
  'summary',
  'author',
  'publicationDate',
  'pagesNumber',
  'language',
  'photo',
];

module.exports = {
  addBook: (data) => {
    const {
      ISBN,
      title,
      summary,
      author,
      publicationDate,
      pagesNumber,
      language,
      genreLivreId,
      uploadPicture,
    } = data;

    return Books.create({
      id: uuidv4(),
      ISBN,
      title,
      summary,
      author,
      publicationDate,
      pagesNumber,
      language,
      genreLivreId,
      uploadPicture: '',
    });
  },

  getAllBooks: async (data) => {
    if (data) {
      return await Books.findAll({
        where: {
          [Op.or]: [{ title: data }, { genreLivreId: data }],
        },
        include: [
          {
            model: GenreLivres,
            attributes: ['name'],
          },
        ],
        attributes: booksAttributes,
        raw: true,
      });
    } else {
      return await Books.findAll({
        include: [
          {
            model: GenreLivres,
            attributes: ['name'],
          },
        ],
        attributes: booksAttributes,
      });
    }
  },

  getBook: (title) => {
    return Books.findOne({
      where: { title: title },
      attributes: booksAttributes,
      include: [
        {
          model: GenreLivres,
          attributes: ['name'],
        },
      ],
    });
  },

  deleteBook: (title) => {
    return Books.destroy({
      where: { title: title },
    });
  },

  updateBook: async (bookId, data) => {
    const [, affectedRow] = await Books.update(data, {
      where: { id: bookId },
      returning: true,
      plain: true,
    });
    const {
      id,
      ISBN,
      title,
      summary,
      author,
      publicationDate,
      pagesNumber,
      language,
      photo,
    } = affectedRow;
    const updatedData = {
      id,
      ISBN,
      title,
      summary,
      author,
      publicationDate,
      pagesNumber,
      language,
      photo,
    };
    return updatedData;
  },
};
