var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//스키마는 document구조가 어떻게 생겼는지 알려주는 역할
var bookSchema = new Schema({
    title:String,
    content:String,
});

//모델 정의
//모델은 데이터베이스 데이터를 읽고, 생성하고, 수정하는 프로그래밍 인터페이스.
//아하. 그래서 모델형 변수를 생성하면 데이터를 내가 직접 쓸수있는거구나. 
//데이터 가지고 놀 수 있는 프로그래밍 인터페이스니까.
//첫번째 인자는 document가 사용할 collection의 단수적 표현?
//collection이 뭐냐. 내 생각에 한 덩어리 한덩어리 인듯, 테이블.
var Book = mongoose.model('book', bookSchema);
var book = new Book({
    title : "Mongoose Test!",
    content: "I am testing this post... I want to save this like static!",
});
//데이터 베이스에 저장
/*
book.save(function(err,book){
    if(err) return console.error(err);
    console.dir(book);
})*/

//모델을 모듈화 
module.exports = mongoose.model('book',bookSchema);