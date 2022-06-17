const { User } = require('../db/models');

async function getUsers(req, res) {
  const users = await User.findAll();
  console.log(users);
  res.json(users);
}

module.exports = { getUsers };
