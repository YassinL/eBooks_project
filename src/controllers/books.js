const { v4: uuidv4 } = require('uuid');
const models = require('../../models');
const { Books, GenreLivres } = models;
const { Op } = require('sequelize');
const { pick } = require('lodash');
const { getGenreLivreByName } = require('./genreLivre');
const { NotFoundError } = require('../helpers/errors');
const fs = require('fs');
const Sequelize = require('sequelize');

const booksAttributes = [
  'ISBN',
  'title',
  'urlTitle',
  'summary',
  'author',
  'publicationDate',
  'pagesNumber',
  'language',
  'uploadPicture',
  'genreLivreId',
  'price',
];

const deleteImage = async (bookFound) => {
  const [, filename] = bookFound.uploadPicture.split('/uploads/');
  fs.unlink(`uploads/${filename}`, (error) => {
    if (error) throw new Error(error);
  });
};

module.exports = {
  addBook: async (data) => {
    // const bookToAdd = pick(data, booksAttributes);
    // const createBook = await Books.create(bookToAdd);
    const genreLivreFound = await getGenreLivreByName(
      data.genreLivreId,
    );

    const {
      ISBN,
      title,
      urlTitle,
      summary,
      author,
      publicationDate,
      pagesNumber,
      language,
      uploadPicture,
      price,
    } = data;

    const createBook = await Books.create({
      ISBN,
      title,
      urlTitle,
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

    // const newBook = {
    //   ...pick(books, booksAttributes),
    //   // genreLivreId: genreLivreFound.id,
    // };
    return books;
  },

  getAllBooks: async (filters) => {
    console.log('FILTERs', filters);
    const filterBook = await Books.findAll({
      where: filters,
      attributes: booksAttributes,
    });
    if (filterBook) {
      return filterBook;
    }
    return await Books.findAll({
      attributes: booksAttributes,
    });
  },

  getSomeBooks: async () => {
    return Books.findAll({
      order: Sequelize.literal('rand()'),
      limit: 10,
    });
  },

  getBook: (urlTitle) => {
    return Books.findOne({
      where: { urlTitle: urlTitle },
      attributes: booksAttributes,
      include: [
        {
          model: GenreLivres,
          attributes: ['name'],
          raw: true,
        },
      ],
    });
  },

  deleteBook: async (urlTitle) => {
    const bookFound = await Books.findOne({
      where: { urlTitle: urlTitle },
    });
    if (!bookFound) {
      throw new NotFoundError(
        'Ressource introuvable',
        "ce livre n'existe pas",
      );
    }
    if (bookFound.uploadPicture) {
      await deleteImage(bookFound);
    }
    await Books.destroy({
      where: { urlTitle: urlTitle },
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
  //     ISBN,no such file or directory, unlink 'uploads/2020-10-13-163132_livres.png'
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

  updateBook: async (urlTitle, data) => {
    const genreLivreFound = await getGenreLivreByName(
      data.genreLivreId,
    );
    console.log('DATA', data);
    const bookFound = await Books.findOne({
      include: [
        {
          model: GenreLivres,
          attributes: ['name'],
        },
      ],
      where: { urlTitle: urlTitle },
    });
    if (!bookFound) {
      throw new NotFoundError(
        'Ressource introuvable',
        "Ce livre n'existe pas",
      );
    }
    if (bookFound.uploadPicture !== data.uploadPicture) {
      await deleteImage(bookFound);
    }

    return bookFound.update({
      ...data,
      genreLivreId: genreLivreFound.id,
    });
  },
};
