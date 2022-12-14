/* eslint-disable no-unused-vars */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Categories',
      [
        {
          id: 1,
          name: 'Category 1',
          description: 'Category 1 description',
          image: 'https://www.designevo.com/res/template-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: 'Category 2',
          description: 'Category 2 description',
          image: 'https://www.designevo.com/res/template-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          name: 'Category 3',
          description: 'Category 3 description',
          image: 'https://www.designevo.com/res/template-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {});
  },
};
