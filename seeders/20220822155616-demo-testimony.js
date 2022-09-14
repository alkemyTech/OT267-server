/* eslint-disable no-unused-vars */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Testimonies',
      [
        {
          id: 1,
          name: 'Testimony 1',
          image: 'https://testimonyimage.jpg',
          content: '🧒 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed sollicitudin leo.',
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          id: 2,
          name: 'Testimony 2',
          image: 'https://testimonyimage.jpg',
          content: '👩 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed sollicitudin leo.',
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          id: 3,
          name: 'Testimony 3',
          image: 'https://testimonyimage.jpg',
          content: '👨 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed sollicitudin leo.',
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          id: 4,
          name: 'Testimony 4',
          image: 'https://testimonyimage.jpg',
          content: '👱‍♀️ Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed sollicitudin leo.',
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          id: 5,
          name: 'Testimony 5',
          image: 'https://testimonyimage.jpg',
          content: '🧔 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed sollicitudin leo.',
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
