var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.cookies);
  res.render('home/index',{
    check: res.locals.check
  });
});

module.exports = router;
