const { v4: uuidv4 } = require('uuid');
const models = require('../../models');
const { Books, GenreLivres } = models;
const { Op } = require('sequelize');
const { pick } = require('lodash');
const { getGenreLivreByName } = require('./genreLivre');

const booksAttributes = [
  'ISBN',
  'title',
  'summary',
  'author',
  'publicationDate',
  'pagesNumber',
  'language',
  'uploadPicture',
  'price',
];

module.exports = {
  addBook: async (data) => {
    const genreLivreFound = await getGenreLivreByName(
      data.genreLivreId,
    );

    const {
      ISBN,
      title,
      summary,
      author,
      publicationDate,
      pagesNumber,
      language,
      uploadPicture,
      price,
    } = data;

    const createBook = await Books.create({
      id: uuidv4(),
      ISBN,
      title,
      summary,
      author,
      publicationDate,
      pagesNumber,
      language,
      genreLivreId: genreLivreFound.id,
      uploadPicture,
      price,
    });
    const books = await Books.findByPk(createBook.id, {
      include: [
        {
          model: GenreLivres,
          attributes: ['name'],
        },
      ],
      attributes: booksAttributes,
    });
    return books;
  },

  getAllBooks: async (filters) => {
    console.log('FILTERs', filters);
    return await Books.findAll({
      where: filters,
      attributes: booksAttributes,
    });
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
