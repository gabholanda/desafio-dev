'use strict';
const transactions = require('./transactionTypeSeed.json');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('TransactionTypes', transactions)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('TransactionTypes', null, {});
  }
};
