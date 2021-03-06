const { Op } = require('sequelize');
const {
  User, UserWeapon, Weapon, sequelize,
} = require('../db/models');

async function getUsers(req, res) {
  let users;
  try {
    users = await User.findAll({
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
  } catch (error) {
    res.send(error.message);
  }

  res.json(users);
}

async function getUserWeapons(req, res) {
  const { username } = req.params;
  let user;
  let weapons;
  try {
    user = await User.findOne({ where: { username } });
  } catch (error) {
    res.send(error.message);
  }

  try {
    weapons = await UserWeapon.findAll({
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
  } catch (error) {
    res.send(error.message);
  }

  res.json(weapons);
}

async function getEnemyWeapons(req, res) {
  const { username } = req.params;
  let user;
  let weapons;
  try {
    user = await User.findOne({ where: { username } });
  } catch (error) {
    res.send(error.message);
  }

  try {
    weapons = await UserWeapon.findAll({
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
        ['weapon_id', 'weapons_id'],
        'wear',
        [sequelize.col('Weapon.ATK'), 'ATK'],
        [sequelize.col('Weapon.DEF'), 'DEF'],
        [sequelize.col('Weapon.title'), 'title'],
        [sequelize.col('Weapon.quality'), 'quality'],
      ],
      raw: true,
    });
  } catch (error) {
    res.send(error.message);
  }

  res.json({ weapons, user });
}

async function putUsersFight(req, res) {
  const userId = req.session.user.id;
  const { enemyId } = req.params;
  let user;
  let enemy;

  try {
    user = await User.findOne({ where: { id: userId } });
  } catch (error) {
    res.send(error.message);
  }

  try {
    enemy = await User.findOne({ where: { id: enemyId } });
  } catch (error) {
    res.send(error.message);
  }

  user.fight = !user.fight;
  user.save();

  try {
    await User.update({
      fight: !enemy.fight,
    }, {
      where: {
        id: enemy.id,
      },
    });
  } catch (error) {
    res.send(error.message);
  }

  res.json(user);
}

async function postTakeLoot(req, res) {
  const {
    lengthPickUserWeapons: userWeaponsTrash,
    lengthPickEnemyWeapons: enemyWeaponsPick,
  } = req.body.arrBody;
  console.log(userWeaponsTrash, '<TRASH');
  console.log(enemyWeaponsPick, '<PICK');
  // console.log(req.body.user, '<----');

  let user;
  try {
    user = await User.findOne({ where: { username: req.body.user.name } });
  } catch (error) {
    res.send(error.message);
  }

  try {
    await UserWeapon.create(
      {
        user_id: user.id,
        weapon_id: enemyWeaponsPick[0].weapons_id,
        wear: 10,
      },
    );
  } catch (error) {
    res.send(error.message);
  }

  try {
    await UserWeapon.destroy({ where: { id: userWeaponsTrash[0].id } });
  } catch (error) {
    res.send(error.message);
  }

  try {
    await UserWeapon.destroy({ where: { id: enemyWeaponsPick[0].id } });
  } catch (error) {
    res.send(error.message);
  }
}

module.exports = {
  getUsers, getUserWeapons, getEnemyWeapons, putUsersFight, postTakeLoot,
};
