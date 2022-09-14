const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Donation extends Model {
  }
  Donation.init({
    data_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mp_userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    data_created: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Donation',
    paranoid: true,
  });
  return Donation;
};
