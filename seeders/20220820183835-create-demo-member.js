/* eslint-disable no-unused-vars */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Members',
      [
        {
          id: 1,
          name: 'Member 1',
          facebookUrl: 'https://memberfacebook.com',
          instagramUrl: 'https://memberinstagram.com',
          linkedinUrl: 'https://memberlinkedIn.com',
          image:
            'https://upload.wikimedia.org/wikipedia/commons/5/5a/John_Doe%2C_born_John_Nommensen_Duchac.jpg',
          description: 'Member 1 description',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: 'Member 2',
          facebookUrl: 'https://memberfacebook.com',
          instagramUrl: 'https://memberinstagram.com',
          linkedinUrl: 'https://memberlinkedIn.com',
          image:
            'https://upload.wikimedia.org/wikipedia/commons/5/5a/John_Doe%2C_born_John_Nommensen_Duchac.jpg',
          description: 'Member 2 description',
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          id: 3,
          name: 'Member 3',
          facebookUrl: 'https://memberfacebook.com',
          instagramUrl: 'https://memberinstagram.com',
          linkedinUrl: 'https://memberlinkedIn.com',
          image:
            'https://upload.wikimedia.org/wikipedia/commons/5/5a/John_Doe%2C_born_John_Nommensen_Duchac.jpg',
          description: 'Member 3 description',
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          id: 4,
          name: 'Member 4',
          facebookUrl: 'https://memberfacebook.com',
          instagramUrl: 'https://memberinstagram.com',
          linkedinUrl: 'https://memberlinkedIn.com',
          image:
            'https://upload.wikimedia.org/wikipedia/commons/5/5a/John_Doe%2C_born_John_Nommensen_Duchac.jpg',
          description: 'Member 4 description',
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          id: 5,
          name: 'Member 5',
          facebookUrl: 'https://memberfacebook.com',
          instagramUrl: 'https://memberinstagram.com',
          linkedinUrl: 'https://memberlinkedIn.com',
          image:
            'https://upload.wikimedia.org/wikipedia/commons/5/5a/John_Doe%2C_born_John_Nommensen_Duchac.jpg',
          description: 'Member 5 description',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Members', null, {});
  },
};
