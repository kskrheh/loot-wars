const usersRouter = require('express').Router();

const {
  getUsers,
  getUserWeapons, getEnemyWeapons,
} = require('../controllers/usersContoller');

usersRouter.post('/', getUsers);
usersRouter.get('/:username', getUserWeapons);
usersRouter.get('/enemy/:username', getEnemyWeapons);

module.exports = usersRouter;
