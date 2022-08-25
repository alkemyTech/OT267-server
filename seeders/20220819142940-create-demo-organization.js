/* eslint-disable no-unused-vars */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
         * Seed commands.
         */
    await queryInterface.bulkInsert(
      'Organizations',
      [
        {
          name: 'Somos Más',
          image: 'somosmas.jpg',
          address: 'San Isidro, Buenos Aires',
          phone: 1160112988,
          email: 'somosfundacionmas@gmail.com',
          welcomeText: 'Este es un texto de bienvenida.',
          aboutUsText:
                        'Desde 1997 en Somos Más trabajamos con los chicos y chicas, mamás y papás, abuelos y vecinos del barrio La Cava generando procesos de crecimiento y de inserción social. Uniendo las manos de todas las familias, las que viven en el barrio y las que viven fuera de ...',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Organizations', null, {});
  },
};
