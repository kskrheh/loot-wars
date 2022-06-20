const usersRouter = require('express').Router();

const {
  getUsers,
  getUserWeapons,
} = require('../controllers/usersContoller');

usersRouter.get('/', getUsers);
usersRouter.get('/:username', getUserWeapons);

module.exports = usersRouter;
