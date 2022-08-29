const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.News, {
        foreignKey: 'categoryId',
        sourceKey: 'id',
      });
    }
  }
  Category.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Category',
    paranoid: true,
    timestamps: true,
  });
  return Category;
};
