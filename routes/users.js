var express = require('express');
var router = express.Router();
var checkLogin = require('../middlewares/checkLogin.middleware');

/* GET users listing. */
router.get('/',function(req, res, next) {
  res.render('users/index');
}); 

module.exports = router;
