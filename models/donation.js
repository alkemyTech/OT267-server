const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Donation extends Model {
  }
  Donation.init({
    donationId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    payment_type: {
      type: DataTypes.String,
      allowNull: false,
    },
    payment_status: {
      type: DataTypes.String,
      allowNull: false,
    },
    userId: {
      type: DataTypes.String,
      allowNull: false,
    },
    payment_date: {
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
