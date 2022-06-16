'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserWeapon extends Model {
    static associate({User, Weapon}) {
      UserWeapon.belongsTo(User, { foreignKey: 'user_id'}),
      UserWeapon.belongsTo(Weapon, {foreignKey: 'weapon_id'})
    }
  }
  UserWeapon.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    weapon_id: {
      allowNull: false,
      references: {
        model: 'Weapons',
        key: 'id'
      },
      type: DataTypes.INTEGER
    },
    user_id: {
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      type: DataTypes.INTEGER
    },
    ATK: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    DEF: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    quality: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    wear: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'UserWeapon',
  });
  return UserWeapon;
};
