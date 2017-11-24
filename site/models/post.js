var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//스키마는 document구조가 어떻게 생겼는지 알려주는 역할
var postSchema = new Schema({
    title:String,
    content:String,
});
//모델을 모듈화 
module.exports = mongoose.model('post',postSchema);