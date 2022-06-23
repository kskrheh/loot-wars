const usersRouter = require('express').Router();

const {
  getUsers,
  getUserWeapons,
  getEnemyWeapons,
  putUsersFight,
} = require('../controllers/usersContoller');

usersRouter.post('/', getUsers);
usersRouter.get('/:username/weapon', getUserWeapons);
usersRouter.get('/enemy/:username', getEnemyWeapons);
usersRouter.put('/:enemyId/fight', putUsersFight);

module.exports = usersRouter;
