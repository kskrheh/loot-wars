const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Weapon, UserWeapon }) {
      User.hasMany(UserWeapon, { foreignKey: 'user_id' });
      User.belongsToMany(Weapon, {
        through: UserWeapon,
        foreignKey: 'weapon_id',
        otherKey: 'user_id',
      });
    }
  }
  User.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    username: {
      allowNull: false,
      unique: true,
      type: DataTypes.TEXT,
    },
    email: {
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
      type: DataTypes.TEXT,
    },
    password: {
      allowNull: false,
      type: DataTypes.TEXT,
      validate: {
        min: 8,
      },
    },
    energy: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 20,
    },
    logoutTime: {
      type: DataTypes.DATE,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
