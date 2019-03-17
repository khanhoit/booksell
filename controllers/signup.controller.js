var Users = require('../models/users.model');
var md5 = require('md5');

module.exports.signupPost= async function(req,res,next){
    var user = {};
    for (const key in req.body) {
        user[key] = req.body[key].trim();
    }
    
    for (const key in user) {
        if(!user[key].length){
            res.render('./signup');   
            return;
        }
    }
    
    if(user.password!==user.cfPassword){
        res.render('./signup');   
        return;
    }else{
        res.cookie('emailUser',user.email,{signed: true});
        res.cookie('psUser',user.password,{signed: true});
        user.password = md5(user.password);
        Users.create(user);
        res.redirect('./users');
    }
    

}


module.exports.signupGet= function(req,res){
    res.render('./signup',{
        check: res.locals.check
      });   
}