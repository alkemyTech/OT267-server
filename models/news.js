const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      News.belongsTo(models.Category, { as: 'category' });

      News.hasMany(models.Comment, {
        foreignKey: 'newsId',
        sourceKey: 'id',
      });
    }
  }
  News.init({
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    name: { type: DataTypes.STRING },
    content: { type: DataTypes.TEXT },
    image: { type: DataTypes.STRING },
    type: { type: DataTypes.STRING },
    categoryId: { type: DataTypes.INTEGER },
  }, {
    sequelize,
    modelName: 'News',
    timestamps: true,
    paranoid: true,
  });
  return News;
};
