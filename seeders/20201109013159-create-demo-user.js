/* eslint-disable no-unused-vars */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = [
      {
        firstName: 'Usuario1',
        lastName: 'Demo1',
        email: 'test1@test.com',
        password: 'user1000',
        roleId: 1,
        image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Usuario2',
        lastName: 'Demo2',
        email: 'test2@test.com',
        password: 'user2000',
        roleId: 1,
        image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Usuario3',
        lastName: 'Demo3',
        email: 'test3@test.com',
        password: 'user3000',
        roleId: 1,
        image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert('Users', users, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('Users', null, {});
         */
  },
};
