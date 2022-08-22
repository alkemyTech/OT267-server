'use strict';
/*
  add when the category model is generated
  categoryId: 1, */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('News', [{
      name : 'Arranca el Sprint 1',
      content : 'El primer sprint se basa en la modelación de la BBDD',
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      
      createdAt: new Date,
      updatedAt: new Date
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('News', null, {});
  }
};
