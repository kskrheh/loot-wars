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
  const weaponsId = req.body.userReduxWeapons;
  const user = await User.findOne({ where: { username: req.body.user } });
  console.log(user.id);
  const newWeapons = await Weapon.findAll({ where: { id: req.body.userReduxWeapons } });
  const userWeapon = await UserWeapon.create({
    user_id: user.id,
    weapon_id: req.body.userReduxWeapons[0],
    ATK: 90,
    DEF: 90,
    quality: 90,
    wear: 20,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  console.log(newWeapons);
  res.json(newWeapons);
}

module.exports = { getLoot, swapLoot };
