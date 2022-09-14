const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Donation extends Model {
  }
  Donation.init({
    donationId: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Donation',
  });
  return Donation;
};
