/* eslint-disable no-console */
const { Weapon, UserWeapon, User } = require('../db/models');
const { sequelize } = require('../db/models');

async function getLoot(req, res) {
  const emptyArr = new Array(6).fill(' ');

  const getRandom = () => Math.floor(Math.random() * 100) + 1;

  const weaponsLoot = emptyArr.map(async () => {
    const number = getRandom();
    let weapon;
    console.log(number);

    if (number >= 45 && number <= 70) {
      weapon = await Weapon.findOne({ where: { quality: '2' }, order: sequelize.fn('RANDOM'), raw: true });
      return weapon;
    }

    if (number > 70 && number <= 85) {
      weapon = await Weapon.findOne({ where: { quality: '3' }, order: sequelize.fn('RANDOM'), raw: true });
      return weapon;
    }

    if (number > 85 && number <= 95) {
      weapon = await Weapon.findOne({ where: { quality: '4' }, order: sequelize.fn('RANDOM'), raw: true });
      return weapon;
    }

    if (number > 95) {
      weapon = await Weapon.findOne({ where: { quality: '5' }, order: sequelize.fn('RANDOM'), raw: true });
      return weapon;
    }

    if (number < 45) {
      weapon = await Weapon.findOne({ where: { quality: '1' }, order: sequelize.fn('RANDOM'), raw: true });
      return weapon;
    }
  });
  res.json(await Promise.all(weaponsLoot));
}

async function swapLoot(req, res) {
  const {
    lengthPickUserWeapons: userWeaponsTrash,
    lengthPickLootWeapons: lootWeaponsPick,
  } = req.body.arrBody;
  console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
  console.log(lootWeaponsPick, userWeaponsTrash);
  const user = await User.findOne({ where: { username: req.body.user } });

  if (userWeaponsTrash.length) {
    userWeaponsTrash.forEach(async (elementID) => {
      if (elementID.id !== '0') {
        const weapon = await UserWeapon.findOne({
          where: {
            id: +elementID.id,
          },
        });
        console.log(weapon, 'DELETEEEEEEE');
        await weapon.destroy();
      }
    });
  }

  if (lootWeaponsPick.length) {
    lootWeaponsPick.forEach(async (elementID) => {
      await UserWeapon.create({
        user_id: user.id,
        weapon_id: +elementID.id,
        wear: 10,
      });
    });
  }
  const userWeapons = await UserWeapon.findAll({
    where: {
      user_id: user.id,
    },
    include: {
      model: Weapon,
    },
  });

  console.log(userWeapons);

  res.json(userWeapons);
}

module.exports = { getLoot, swapLoot };
