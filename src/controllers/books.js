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

  getAllBooks: () => {
    return Books.findAll({
      attributes: booksAttributes,
    });
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

  updateBook: async (data, title) => {
    const bookFound = await Books.findOne({
      where: { title: title },
      attributes: booksAttributes,
    });
    if (!bookFound) {
      return bookFound;
    }
    return Books.update(data);
  },
};
