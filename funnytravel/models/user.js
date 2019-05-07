var mongoose = require('mongoose');
var userSchema = require('../schemas/users')

// 定义一个模型类
module.exports = mongoose.model('User', userSchema)
