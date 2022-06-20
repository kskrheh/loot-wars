const {Op} = require("sequelize");
const {
  User, UserWeapon, Weapon, sequelize,
} = require('../db/models');

async function getUsers(req, res) {
  const users = await User.findAll({
    where: {
      username: {
        [Op.ne] : req.body.name
      }
    },
    order: sequelize.fn('RANDOM'),
    limit: 10
  });
  // console.log(users)
  res.json(users);
}

async function getUserWeapons(req, res) {
  const { username } = req.params;
  const user = await User.findOne({ where: { username } });
  const weapons = await UserWeapon.findAll({
    where: {
      user_id: user.id,
    },
    include: {
      model: Weapon,
      attributes: [
        'ATK', 'DEF', 'title', 'quality',
      ],
    },
    attributes: [
      ['weapon_id', 'id'],
      'wear',
      [sequelize.col('Weapon.ATK'), 'ATK'],
      [sequelize.col('Weapon.DEF'), 'DEF'],
      [sequelize.col('Weapon.title'), 'title'],
      [sequelize.col('Weapon.quality'), 'quality'],
    ],
    raw: true,
  });
  res.json(weapons);
}

module.exports = { getUsers, getUserWeapons };
