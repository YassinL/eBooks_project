const { v4: uuidv4 } = require('uuid');
const models = require('../../models');
const { Books, GenreLivres } = models;
const { Op } = require('sequelize');
const { pick } = require('lodash');

const booksAttributes = [
  'ISBN',
  'title',
  'summary',
  'author',
  'publicationDate',
  'pagesNumber',
  'language',
  'genreLivreId',
  'uploadPicture',
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

    // const newBook = pick(data, booksAttributes);
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
      uploadPicture,
    });
  },

  getAllBooks: async (data) => {
    if (data) {
      return await Books.findAll({
        where: {
          [Op.or]: [
            { title: data },
            { genreLivreId: data },
            { author: data },
          ],
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

  // updateBook: async (bookId, data) => {
  //   const [, affectedRow] = await Books.update(data, {
  //     where: { id: bookId },
  //     include: [
  //       {
  //         model: GenreLivres,
  //         attributes: ['name'],
  //       },
  //     ],
  //     returning: true,
  //     plain: true,
  //     attributes: booksAttributes,
  //   });
  //   const {
  //     id,
  //     ISBN,
  //     title,
  //     summary,
  //     author,
  //     publicationDate,
  //     pagesNumber,
  //     language,
  //     genreLivreId,
  //   } = affectedRow;
  //   const updatedData = {
  //     id,
  //     ISBN,
  //     title,
  //     summary,
  //     author,
  //     publicationDate,
  //     pagesNumber,
  //     language,
  //     genreLivreId,
  //   };
  //   return updatedData;
  // },

  updateBook: async (data, bookId) => {
    const bookFound = await Books.findByPk(bookId, {
      include: [
        {
          model: GenreLivres,
          attributes: ['name'],
        },
      ],
    });
    if (!bookFound) {
      return bookFound;
    }
    return bookFound.update(data);
  },
};
