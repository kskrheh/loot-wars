const bcrypt = require('bcrypt');
const { User } = require('../db/models');
const { SALT_ROUNDS } = require('../app/variables');

async function createUser(req, res) {
  const { login, password, email } = req.body;
  try {
    const user = await User.create({
      login,
      password: await bcrypt.hash(password, SALT_ROUNDS),
      email,
    });
    req.session.user = user;
    res.send(user);
  } catch (err) {
    res.send(err.message);
  }
}

async function loginUser(req, res) {
  const { login, password } = req.body;
  let user;
  try {
    user = await User.findOne({
      where: {
        login,
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
  req.session.user = user;
  res.send(user);
}

async function logoutUser(req, res) {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Ошибка при удалении сессии' });
    }
    res.clearCookie('user_sid');
    res.sendStatus(200);
  });
}
module.exports = { createUser, loginUser, logoutUser };
