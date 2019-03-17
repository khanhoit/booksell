var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: String,
    email:String,
    phone:String,
    password:String,
    avatar:String
});

var User = mongoose.model('users', userSchema,'users');

module.exports = User;

