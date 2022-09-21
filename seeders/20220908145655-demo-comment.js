/* eslint-disable no-unused-vars */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const comments = [
      {
        id: 1,
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed sollicitudin leo. 👍',
        userId: 1,
        newsId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed sollicitudin leo. 👍',
        userId: 2,
        newsId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed sollicitudin leo. 👎',
        userId: 1,
        newsId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed sollicitudin leo. 👎',
        userId: 1,
        newsId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed sollicitudin leo. 👍',
        userId: 3,
        newsId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed sollicitudin leo. 👍',
        userId: 3,
        newsId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed sollicitudin leo. 👎',
        userId: 5,
        newsId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 8,
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed sollicitudin leo. 👎',
        userId: 6,
        newsId: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 9,
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed sollicitudin leo. 👍',
        userId: 10,
        newsId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 10,
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed sollicitudin leo. 👍',
        userId: 3,
        newsId: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 11,
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed sollicitudin leo. 👎',
        userId: 8,
        newsId: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 12,
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed sollicitudin leo. 👎',
        userId: 7,
        newsId: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert('Comments', comments, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Comments', null, {});
  },
};
