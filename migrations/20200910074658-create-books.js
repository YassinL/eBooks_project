'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Books', {
      id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      ISBN: {
        allowNull: false,
        type: Sequelize.INTEGER(13),
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      summary: {
        allowNull: false,
        type: Sequelize.STRING(1000),
      },
      author: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      publicationDate: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      pagesNumber: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      language: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      genreLivreId: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        references: {
          model: 'GenreLivres',
          key: 'id',
        },
      },
      uploadPicture: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Books');
  },
};
