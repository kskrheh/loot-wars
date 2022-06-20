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
  console.log(weaponsId);
  const weaponsFromBase = await Weapon.findAll({ where: { id: weaponsId } });

  const userWeapons = weaponsId.forEach(async (id) => {
    await UserWeapon.create({
      user_id: user.id,
      weapon_id: id,
      wear: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });

  console.log(userWeapons);

  // console.log(weaponsFromBase);
  res.json(weaponsFromBase);
}

module.exports = { getLoot, swapLoot };
