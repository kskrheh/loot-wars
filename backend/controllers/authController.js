const bcrypt = require('bcrypt');
const { User } = require('../db/models');
const { SALT_ROUNDS } = require('../app/variables');

async function createUser(req, res) {
  const { login: username, password, email } = req.body;
  try {
    const user = await User.create({
      username,
      password: await bcrypt.hash(password, SALT_ROUNDS),
      email,
    });
    res.json(user);
  } catch (err) {
    res.send(err.message);
  }
}

async function loginUser(req, res) {
  const { login: username, password } = req.body;
  let user;
  try {
    user = await User.findOne({
      where: {
        username,
      },
    });
  } catch (err) {
    res.send(err.message);
  }
  if (!user) {
    res.status(403);
  }
  let isSame;
  try {
    isSame = await bcrypt.compare(password, user.password);
  } catch (err) {
    res.status(403);
  }
  if (!isSame) {
    res.status(403);
  }
  res.json(user);
}

async function logoutUser(req, res) {
  // req.session.destroy((err) => {
  // if (err) {
  // return res.status(500).json({ message: 'Ошибка при удалении сессии' });
  // }
  // res.clearCookie('user_sid');
  // TODO remove setCookie
  res.sendStatus(200);
  // });
}
module.exports = { createUser, loginUser, logoutUser };
