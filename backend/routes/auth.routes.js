const authRouter = require('express').Router();
const {
  createUser, loginUser, logoutUser, getUserInfo,
} = require('../controllers/authController');

authRouter.post('/register', createUser);
authRouter.post('/login', loginUser);
authRouter.delete('/logout', logoutUser);
authRouter.get('/info', getUserInfo);

module.exports = authRouter;
