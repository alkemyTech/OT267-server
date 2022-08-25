const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Role.hasMany(models.User, {
        foreignKey: 'roleId',
        sourceKey: 'id',
      });
    }
  }
  Role.init({
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      unique: true,
      require: true,
      type: DataTypes.STRING(50),
      validate: {
        notEmpty: { msg: 'The name field must not be empty.' },
        notNull: { msg: "The name field does't support null values." },
      },
    },
    description: DataTypes.STRING,
    deletedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Role',
    paranoid: true,
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  });
  return Role;
};
