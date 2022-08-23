'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Slides extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Slides.belongsTo(models.Organization, {foreignKey: 'organizationId'});
    }
  };
  Slides.init({
    imageURL: {
      type: DataTypes.STRING,
      allowNull: false
    },
    text: {
      type: DataTypes.STRING
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    organizationId: {
      type:DataTypes.INTEGER,
      references: {
        model: 'Organizations',
        key: "id"
      },
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Slides',
    paranoid: true,
    timestamps: true
  });
  return Slides;
};