/* eslint-disable no-unused-vars */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const slides = [
      {
        id: 1,
        image: 'https://slide1-image.png',
        text: 'slide1-text',
        order: 1,
        organizationId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        image: 'https://slide2-image.png',
        text: 'slide2-text',
        order: 2,
        organizationId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        image: 'https://slide3-image.png',
        text: 'slide3-text',
        order: 3,
        organizationId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        image: 'https://slide4-image.png',
        text: 'slide4-text',
        order: 4,
        organizationId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert('Slides', slides, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Slides', null, {});
  },
};
