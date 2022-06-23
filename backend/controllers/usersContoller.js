const { Op } = require('sequelize');
const {
  User, UserWeapon, Weapon, sequelize,
} = require('../db/models');

async function getUsers(req, res) {
  const users = await User.findAll({
    include: [{
      model: UserWeapon,
      include: {
        model: Weapon,
        attributes: [
          'ATK', 'DEF',
        ],
      },
    }],
    where: {
      fight: false,
      username: {
        [Op.ne]: req.body.name,
      },
    },
    order: sequelize.fn('RANDOM'),
    limit: 10,
  });

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
        'id', 'ATK', 'DEF', 'title', 'quality',
      ],
    },
    attributes: [
      'id',
      ['weapon_id', 'weapon_id'],
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

async function getEnemyWeapons(req, res) {
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
      'id',
      ['weapon_id', 'weapon_id'],
      'wear',
      [sequelize.col('Weapon.ATK'), 'ATK'],
      [sequelize.col('Weapon.DEF'), 'DEF'],
      [sequelize.col('Weapon.title'), 'title'],
      [sequelize.col('Weapon.quality'), 'quality'],
    ],
    raw: true,
  });
  res.json({ weapons, user });
}

async function putUsersFight(req, res) {
  const userId = req.session.user.id;
  const { enemyId } = req.params;

  const user = await User.findOne({ where: { id: userId } });
  const enemy = await User.findOne({ where: { id: enemyId } });

  user.fight = !user.fight;
  user.save();

  await User.update({
    fight: !enemy.fight,
  }, {
    where: {
      id: enemy.id,
    },
  });
  res.json(user);
}

async function postTakeLoot(req, res) {
  const {
    lengthPickUserWeapons: userWeaponsTrash,
    lengthPickEnemyWeapons: enemyWeaponsPick,
  } = req.body.arrBody;
  console.log(userWeaponsTrash, enemyWeaponsPick);
  console.log(req.body.user, '<----')
  try {
    const user = await User.findOne({ where: { username: req.body.user.name } });

    const weapon = await UserWeapon.findOne({
      where: {
        id: +userWeaponsTrash[0].id,
      },
    });
    await weapon.destroy();

    await UserWeapon.create({
      user_id: user.id,
      weapon_id: +enemyWeaponsPick[0].weapon_id,
      wear: 10,
    });

    await UserWeapon.destroy({
      where: {
        id: +enemyWeaponsPick[0].id,
      },
    });
    res.json({ message: 'fulfilled' });
  } catch (err) {
    res.send(err.message);
  }
}

module.exports = {
  getUsers, getUserWeapons, getEnemyWeapons, putUsersFight, postTakeLoot,
};
