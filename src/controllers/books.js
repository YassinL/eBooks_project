const models = require('../../models');
const { Books } = models;

const booksAttributes = [
  'ISBN',
  'title',
  'summary',
  'author',
  'publicationDate',
  'pagesNumber',
  'language',
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
      photo,
    } = data;

    return Books.create({
      ISBN,
      title,
      summary,
      author,
      publicationDate,
      pagesNumber,
      language,
      photo,
    });
  },

  getAllBooks: async (data) => {
    if (data) {
      return await Books.findAll({
        where: { title: data },
        attributes: booksAttributes,
        raw: true,
      });
    } else {
      return await Books.findAll({
        attributes: booksAttributes,
      });
    }
  },

  getBook: (title) => {
    return Books.findOne({
      where: { title: title },
      attributes: booksAttributes,
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
