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
    facebookUrl: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    instagramUrl: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    linkedinUrl: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    description: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Member',
    paranoid: true,
    timestamps: true,
  });
  return Member;
};
