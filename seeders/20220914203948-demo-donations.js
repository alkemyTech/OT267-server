/* eslint-disable no-unused-vars */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const donations = [
      {
        donationId: '1231241452431',
      },
    ];
    await queryInterface.bulkInsert('Donations', donations, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Donations', null, {});
  },
};
