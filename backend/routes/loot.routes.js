const { getLoot } = require('../controllers/lootController2');

const lootRouter = require('express').Router();

lootRouter.get('/', getLoot)


module.exports = lootRouter
