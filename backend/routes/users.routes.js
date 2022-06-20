const usersRouter = require('express').Router();

const {
  getUsers,
  getUserWeapons,
} = require('../controllers/usersContoller');

usersRouter.post('/', getUsers);
usersRouter.get('/:username', getUserWeapons);

module.exports = usersRouter;
