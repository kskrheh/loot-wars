/* eslint-disable no-console */
const { Weapon, UserWeapon, User } = require('../db/models');
const { sequelize } = require('../db/models');

async function getLoot(req, res) {
  let lootRan;
  try {
    lootRan = await Weapon.findAll({ order: sequelize.fn('RANDOM'), limit: 6 });
    console.log(lootRan);
    res.json(lootRan);
  } catch (err) {
    res.send(err.message);
  }
}

async function swapLoot(req, res) {
  const { userWeaponID, lootWeaponID } = req.body.arrayIds;
  const user = await User.findOne({ where: { username: req.body.user } });
  if (userWeaponID) {
    userWeaponID.forEach(async (elementID) => {
      await UserWeapon.destroy({
        where: {
          user_id: user.id,
          weapon_id: +elementID,
        },
      });
    });
  }
  if (lootWeaponID) {
    lootWeaponID.forEach(async (elementID) => {
      await UserWeapon.create({
        user_id: user.id,
        weapon_id: +elementID,
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
