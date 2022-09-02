/* eslint-disable no-unused-vars */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Testimonies',
      [
        {
          name: 'Mi primer testimonio',
          image: 'ejemplo.jpg',
          content: 'Mi experiencia con Somos Mas es altamente positiva.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Testimonies', null, {});
  },
};
