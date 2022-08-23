'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Member', [{
      name: 'John Doe',
      facebookUrl: null,
      instagramUrl: null,
      linkedinUrl: null,
      image: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/John_Doe%2C_born_John_Nommensen_Duchac.jpg',
      description: 'alias used to refer to someone unknown.'
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Member', null, {});
  }
};
