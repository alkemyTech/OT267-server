const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Categorie extends Model {
    static associate(models) {
      Categorie.hasMany(models.News, {
        foreignKey: 'categoryId',
        sourceKey: 'id',
      });
    }
  }
  Categorie.init({
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    description: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Categorie',
    paranoid: true,
    timestamps: true,
  });
  return Categorie;
};
