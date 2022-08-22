"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Activity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Activity.init(
    {
      name: DataTypes.CHAR,
      content: DataTypes.TEXT,
      image: DataTypes.CHAR,
    },
    {
      sequelize,
      modelName: "Activity",
    }
  );
  return Activity;
};
