'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderBooks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Books, { foreignKey: 'booksId' });
      this.belongsTo(models.Order, { foreignKey: 'panierId' });
    }
  }
  OrderBooks.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        validate: {
          notNull: true,
          isUUID: 4,
        },
      },
      booksId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Books',
          key: 'id',
        },
      },
      panierId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Order',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'OrderBooks',
    },
  );
  return OrderBooks;
};
