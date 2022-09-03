const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    static associate() {
    }
  }
  Member.init({
    name: DataTypes.STRING,
    facebookUrl: DataTypes.STRING,
    instagramUrl: DataTypes.STRING,
    linkedinUrl: DataTypes.STRING,
    image: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Member',
    /* paranoid: true, if this is set true it cant be deleted, just update the column deletedAt */
    timestamps: true,
  });
  return Member;
};
