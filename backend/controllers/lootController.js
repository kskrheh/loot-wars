const { Weapon } = require('../db/models');
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

module.exports = { getLoot };
