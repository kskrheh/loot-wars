const lootRouter = require('express').Router();
const { getLoot } = require('../controllers/lootController');

lootRouter.get('/', getLoot);

module.exports = lootRouter;
