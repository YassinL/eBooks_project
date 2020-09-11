const models = require('../../models');
const { Books } = models;

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
};
