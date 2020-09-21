'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GenreLivres extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Books, {
        foreignKey: 'genreLivreId',
      });
    }
  }
  GenreLivres.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'GenreLivres',
    },
  );
  return GenreLivres;
};
