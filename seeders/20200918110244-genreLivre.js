'use strict';
const Faker = require('../seeds/GenreLivre');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'GenreLivres',
      Faker('GenreLivre'),
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('GenreLivres', null, {});
  },
};
