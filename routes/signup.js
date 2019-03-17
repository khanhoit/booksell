var express = require('express');
var route = express.Router();

var controller = require('../controllers/signup.controller');

route.get('/',controller.signupGet);
route.post('/',controller.signupPost);

module.exports = route;