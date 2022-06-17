const { Weapon } = require("../db/models");

async function getLoot(req, res) {
  const { title } = req.body;
  let lootRan;
  try {
    lootRan = await Weapon.findAll({
      where: {
        title,
        ATK,
        DEF,
        quality,
      },
    });
  } catch (err) {
    res.send(err.message);
  }
}

module.exports = { getLoot };
