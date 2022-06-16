'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Weapons', [{
       title: 'Kalash',
       ATK: 16,
       DEF: 13,
       quality: 1,
       createdAt: new Date(),
       updatedAt: new Date(),
     }, {
       title: 'Kalash',
       ATK: 22,
       DEF: 15,
       quality: 2,
       createdAt: new Date(),
       updatedAt: new Date(),
     }, {
       title: 'Kalash',
       ATK: 38,
       DEF: 29,
       quality: 3,
       createdAt: new Date(),
       updatedAt: new Date(),
     }, {
       title: 'Kalash',
       ATK: 68,
       DEF: 59,
       quality: 4,
       createdAt: new Date(),
       updatedAt: new Date(),
     }, {
       title: 'Kalash',
       ATK: 89,
       DEF: 77,
       quality: 5,
       createdAt: new Date(),
       updatedAt: new Date(),
     }, {
       title: 'Katana',
       ATK: 19,
       DEF: 5,
       quality: 1,
       createdAt: new Date(),
       updatedAt: new Date(),
     }, {
       title: 'Katana',
       ATK: 27,
       DEF: 11,
       quality: 2,
       createdAt: new Date(),
       updatedAt: new Date(),
     }, {
       title: 'Katana',
       ATK: 46,
       DEF: 31,
       quality: 3,
       createdAt: new Date(),
       updatedAt: new Date(),
     }, {
       title: 'Katana',
       ATK: 73,
       DEF: 53,
       quality: 4,
       createdAt: new Date(),
       updatedAt: new Date(),
     }, {
       title: 'Katana',
       ATK: 94,
       DEF: 66,
       quality: 5,
       createdAt: new Date(),
       updatedAt: new Date(),
     }, {
       title: 'Shield',
       ATK: 0,
       DEF: 19,
       quality: 1,
       createdAt: new Date(),
       updatedAt: new Date(),
     }, {
       title: 'Shield',
       ATK: 0,
       DEF: 27,
       quality: 2,
       createdAt: new Date(),
       updatedAt: new Date(),
     }, {
       title: 'Shield',
       ATK: 0,
       DEF: 46,
       quality: 3,
       createdAt: new Date(),
       updatedAt: new Date(),
     }, {
       title: 'Shield',
       ATK: 0,
       DEF: 75,
       quality: 4,
       createdAt: new Date(),
       updatedAt: new Date(),
     }, {
       title: 'Shield',
       ATK: 0,
       DEF: 94,
       quality: 5,
       createdAt: new Date(),
       updatedAt: new Date(),
     }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Weapons', null, {});
  }
};
