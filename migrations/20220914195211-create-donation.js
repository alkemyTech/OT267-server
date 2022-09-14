module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Donations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      donationId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      payment_type: {
        type: Sequelize.String,
        allowNull: false,
      },
      payment_status: {
        type: Sequelize.String,
        allowNull: false,
      },
      userId: {
        type: Sequelize.String,
        allowNull: false,
      },
      payment_date: {
        type: Sequelize.Date,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Donations');
  },
};
