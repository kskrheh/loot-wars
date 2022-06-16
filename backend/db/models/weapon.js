'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Weapon extends Model {
    static associate({User, UserWeapon}) {
      Weapon.hasMany(UserWeapon, {foreignKey: 'weapon_id'});
      Weapon.belongsToMany(User, {
        through: UserWeapon,
        foreignKey: 'user_id',
        otherKey: 'weapon_id'
      })
    }
  }
  Weapon.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: {
      allowNull: false,
      type: DataTypes.TEXT
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
    modelName: 'Weapon',
  });
  return Weapon;
};
