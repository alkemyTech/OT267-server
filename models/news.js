'use strict';
const {  Model } = require('sequelize');
/* const Categories = require(model directory)*/
module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      const model = models.Categories;
      if ( model ){

            model.hasMany(News, {
              foreignKey : 'categoryId'
            });
            News.belongsTo(model)
        }
      
    }
  };
  News.init({
    id : DataTypes.INTEGER,

    name: DataTypes.STRING,
    content: DataTypes.TEXT,
    
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'News',
    timestamps : true,
    paranoid: true,
  });
  return News;
};