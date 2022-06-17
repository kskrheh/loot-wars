const usersRouter = require('express').Router();

const {
  getUsers,
} = require('../controllers/usersContoller');

usersRouter.get('/', getUsers);

module.exports = usersRouter;
