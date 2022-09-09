const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models.User, { as: 'user' });
      Comment.belongsTo(models.News, { as: 'news' });
    }
  }
  Comment.init({
    body: { type: DataTypes.STRING, allowNull: false },
    deletedAt: { type: DataTypes.DATE },
    userId: { type: DataTypes.INTEGER },
    newsId: { type: DataTypes.INTEGER },
  }, {
    sequelize,
    modelName: 'Comment',
    paranoid: true,
    timestamps: true,
  });
  return Comment;
};
