const lootRouter = require('express').Router();
const { getLoot, swapLoot } = require('../controllers/lootController');

lootRouter.get('/', getLoot);
lootRouter.post('/', swapLoot);

module.exports = lootRouter;
