module.exports = {
  up: async (queryInterface, Sequelize) =>
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    // eslint-disable-next-line implicit-arrow-linebreak
    Promise.all([
      queryInterface.addColumn(
        'Organizations', // table name
        'facebook', // new field name
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'Organizations',
        'linkedin',
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'Organizations',
        'instagram',
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      ),
    ]),

  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) =>
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    // logic for reverting the changes
    // eslint-disable-next-line implicit-arrow-linebreak
    Promise.all([
      queryInterface.removeColumn('Organizations', 'facebook'),
      queryInterface.removeColumn('Organizations', 'linkedin'),
      queryInterface.removeColumn('Organizations', 'instagram'),
    ])
  ,
};
