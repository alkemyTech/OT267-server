/* eslint-disable no-unused-vars */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'News',
      [
        {
          name: 'News 1',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed sollicitudin leo. Nullam eget aliquet odio. Vivamus laoreet nulla ac pretium laoreet. Maecenas consequat, lectus eu posuere laoreet, dolor dolor finibus felis, eleifend gravida nibh orci at velit. Nullam vitae purus at massa congue cursus. Mauris dui velit, laoreet at nibh in, commodo feugiat nisl. Cras augue sem, fermentum vitae velit vitae, congue laoreet massa. ',
          image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          categoryId: 1,
          type: 'news',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'News 2',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed sollicitudin leo. Nullam eget aliquet odio. Vivamus laoreet nulla ac pretium laoreet. Maecenas consequat, lectus eu posuere laoreet, dolor dolor finibus felis, eleifend gravida nibh orci at velit. Nullam vitae purus at massa congue cursus. Mauris dui velit, laoreet at nibh in, commodo feugiat nisl. Cras augue sem, fermentum vitae velit vitae, congue laoreet massa. ',
          image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          categoryId: 1,
          type: 'news',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'News 3',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed sollicitudin leo. Nullam eget aliquet odio. Vivamus laoreet nulla ac pretium laoreet. Maecenas consequat, lectus eu posuere laoreet, dolor dolor finibus felis, eleifend gravida nibh orci at velit. Nullam vitae purus at massa congue cursus. Mauris dui velit, laoreet at nibh in, commodo feugiat nisl. Cras augue sem, fermentum vitae velit vitae, congue laoreet massa. ',
          image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          categoryId: 1,
          type: 'news',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('News', null, {});
  },
};
