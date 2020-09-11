'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
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
      photo: {
        allowNull: false,
        type: Sequelize.BLOB('long'),
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
