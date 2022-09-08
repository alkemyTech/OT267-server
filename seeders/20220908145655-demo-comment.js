/* eslint-disable no-unused-vars */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const comments = [
      {
        body: 'user 1 comment body about news 1 👍',
        userId: 1,
        newsId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        body: 'user 2 comment body about news 1 👍',
        userId: 2,
        newsId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        body: 'user 1 comment body about news 2 👎',
        userId: 1,
        newsId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        body: 'user 1 comment body about news 3 👎',
        userId: 1,
        newsId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      }];
    await queryInterface.bulkInsert('Comments', comments, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Comments', null, {});
  },
};
