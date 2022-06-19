const { User, UserWeapon, Weapon } = require('../db/models');

async function getUsers(req, res) {
  const users = await User.findAll();
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
    },
  });
  res.json(weapons);
}

module.exports = { getUsers, getUserWeapons };
