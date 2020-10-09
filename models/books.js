'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Books extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.GenreLivres, {
        foreignKey: 'genreLivreId',
      });
      this.belongsToMany(models.Order, {
        through: 'OrderBooks',
        foreignKey: 'booksId',
        as: 'orders',
      });
    }
  }
  Books.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        validate: {
          notNull: true,
          isUUID: 4,
        },
      },
      ISBN: DataTypes.STRING,
      title: DataTypes.STRING,
      summary: DataTypes.STRING,
      author: DataTypes.STRING,
      publicationDate: DataTypes.DATE,
      pagesNumber: DataTypes.INTEGER,
      language: DataTypes.STRING,
      genreLivreId: DataTypes.INTEGER,
      uploadPicture: DataTypes.STRING,
      price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Books',
    },
  );
  return Books;
};
