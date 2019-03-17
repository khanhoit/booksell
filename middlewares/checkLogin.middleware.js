var Users = require('../models/users.model');
var md5 = require('md5'); 


// kiểm tra xem người dùng login chưa mới đk vào trang /users
module.exports.requireLogin= async function(req,res,next){
    var user= req.signedCookies;
    if(!user.emailUser){
        res.redirect('./login');
        next();
    }
    var data = await Users.find({$and:[{email: user.emailUser},{password:md5(user.psUser)}]})
    if(!data.length){
        res.render('./login');
        return;
    }
    next();
}

// kiểm tra nếu người dùng đăng nhập oy thì không và đk trang /signup or login
module.exports.logged= async function(req,res,next){
    var user= req.signedCookies;
    if(!user.emailUser){
        next();
    }
    var data = await Users.find({$and:[{email: user.emailUser},{password:md5(user.psUser)}]})
    if(data.length){
        res.redirect('./users');
        return;
    }
    next();
}

// kiểm trả người dùng login chưa để hiện thi các chức năng của người dùng trên header-layout
module.exports.checkLoginShowFunctionUser= async function(req,res,next){
    var user= req.signedCookies;
    if(!user.emailUser){
        res.locals.check=false;
    }else{
        var data = await Users.find({$and:[{email: user.emailUser},{password:md5(user.psUser)}]})
        if(!data.length){
                res.locals.check=false;
            }else{
                res.locals.check=true;
            }
    }

    
    next();
}