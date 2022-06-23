/* eslint-disable no-console */
const { Weapon, UserWeapon, User } = require('../db/models');
const { sequelize } = require('../db/models');

async function getLoot(req, res) {
  const emptyArr = new Array(6).fill(' ');

  const getRandom = () => Math.floor(Math.random() * 100) + 1;

  let weaponsAwait;
  const weaponsLoot = emptyArr.map(async () => {
    const number = getRandom();
    let weapon;

    if (number >= 45 && number <= 70) {
      try {
        weapon = await Weapon.findOne({ where: { quality: '2' }, order: sequelize.fn('RANDOM'), raw: true });
        return weapon;
      } catch (error) {
        res.send(error.message);
      }
    }

    if (number > 70 && number <= 85) {
      try {
        weapon = await Weapon.findOne({ where: { quality: '3' }, order: sequelize.fn('RANDOM'), raw: true });
        return weapon;
      } catch (error) {
        res.send(error.message);
      }
    }

    if (number > 85 && number <= 95) {
      try {
        weapon = await Weapon.findOne({ where: { quality: '4' }, order: sequelize.fn('RANDOM'), raw: true });
        return weapon;
      } catch (error) {
        res.send(error.message);
      }
    }

    if (number > 95) {
      try {
        weapon = await Weapon.findOne({ where: { quality: '5' }, order: sequelize.fn('RANDOM'), raw: true });
        return weapon;
      } catch (error) {
        res.send(error.message);
      }
    }

    if (number < 45) {
      try {
        weapon = await Weapon.findOne({ where: { quality: '1' }, order: sequelize.fn('RANDOM'), raw: true });
        return weapon;
      } catch (error) {
        res.send(error.message);
      }
    }
  });

  try {
    weaponsAwait = await Promise.all(weaponsLoot);
  } catch (error) {
    res.send(error.message);
  }
  res.json(weaponsAwait);
}

async function swapLoot(req, res) {
  const {
    lengthPickUserWeapons: userWeaponsTrash,
    lengthPickLootWeapons: lootWeaponsPick,
  } = req.body.arrBody;
  let user;
  let weapon;
  let userWeapons;
  try {
    user = await User.findOne({ where: { username: req.body.user } });
  } catch (error) {
    res.send(error.message);
  }

  if (userWeaponsTrash.length) {
    userWeaponsTrash.forEach(async (elementID) => {
      if (elementID.id !== '0') {
        try {
          weapon = await UserWeapon.findOne({
            where: {
              id: +elementID.id,
            },
          });
        } catch (error) {
          res.send(error.message);
        }

        try {
          await weapon.destroy();
        } catch (error) {
          res.send(error.message);
        }
      }
    });
  }

  if (lootWeaponsPick.length) {
    lootWeaponsPick.forEach(async (elementID) => {
      try {
        await UserWeapon.create({
          user_id: user.id,
          weapon_id: +elementID.id,
          wear: 10,
        });
      } catch (error) {
        res.send(error.message);
      }
    });
  }

  try {
    userWeapons = await UserWeapon.findAll({
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
  } catch (error) {
    res.send(error.message);
  }

  res.json(userWeapons);
}

module.exports = { getLoot, swapLoot };
