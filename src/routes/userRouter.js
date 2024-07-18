const express = require('express');
const userController = require('../controllers/userController');
const route = express.Router();

route.post('/saveuser', userController.saveOneUser);

module.exports = route;