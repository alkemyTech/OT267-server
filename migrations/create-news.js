'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('News', {
    id : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    } ,
    name: {
        type : Sequelize.STRING,
        allowNull : false,
    },
    content: {
        type : Sequelize.TEXT,
        allowNull : false,
    },
    image: {
        type : Sequelize.STRING,
        allowNull : false,
    },
    /* categoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Categories',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    }, */
    deletedAt: {
        type: Sequelize.DATE
    },
    createdAt: {
        allowNull: false,
        type: Sequelize.DATE
    },
    updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
    }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('News');
  }
};