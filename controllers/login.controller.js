var Users = require('../models/users.model');
var md5 = require('md5');

module.exports.loginPost= async function(req,res){
    var user = req.body;
    var data = await Users.find({$and:[{email: user.email},{password:md5(user.password)}]})
    if(!data.length){
        res.render('./login');
        return;
    }
    // if(user.rememberPassword){
        res.cookie('emailUser',user.email,{signed: true});
        res.cookie('psUser',user.password,{signed: true});
        // }
        res.redirect('./users');
};


module.exports.loginGet=function(req,res,next){
    res.render('login',{
        check: res.locals.check
      });
}