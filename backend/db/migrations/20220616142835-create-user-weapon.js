module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserWeapons', {
      weapon_id: {
        allowNull: false,
        references: {
          model: 'Weapons',
          key: 'id',
        },
        type: Sequelize.INTEGER,
      },
      user_id: {
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        type: Sequelize.INTEGER,
      },
      wear: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('UserWeapons');
  },
};
