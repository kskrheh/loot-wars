const authRouter = require('express').Router();
const { createUser, loginUser, logoutUser } = require('../controllers/authController');

authRouter.post('/register', createUser);
authRouter.post('/login', loginUser);
authRouter.delete('/logout', logoutUser);

module.exports = authRouter;
