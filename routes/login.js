var express = require('express');
var route = express.Router();
var controller = require('../controllers/login.controller');


route.get('/',controller.loginGet);
route.post('/',controller.loginPost);

module.exports= route;