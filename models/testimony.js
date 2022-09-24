const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Testimony extends Model {
    static associate() {
      // define association here
    }
  }
  Testimony.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Testimony',
    paranoid: true,
    timestamps: true,
  });
  return Testimony;
};
