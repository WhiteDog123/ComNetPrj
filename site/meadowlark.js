
//require : 모듈 가져오는 함수
//include 와 비슷한 느낌이군.
//기본적으로 node_modules 디렉토리에서 찾는다
// ./를 붙이면 거기서 찾지 않는다.
var express = require('express');
var mongoose = require('mongoose');
var htmlToText = require('html-to-text');




var opts = {
    server: {
        socketOptions: { keepAlive: 1 }
    }
};
var mongooseUrl = 'mongodb://WhiteDog:WhiteDog123@ds251435.mlab.com:51435/comnetprjdatabase';
var fortune = require('./lib/fortune.js');
var getWeather = require('./lib/getWeather.js');
mongoose.Promise = global.Promise;

//몽고 디비에 연결//
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("connected");
});
mongoose.connect(mongooseUrl);

//if(app.thing ====null) console.log('bleat');
var app = express();
app.use(express.static(__dirname + '/public'));
app.use(require('body-parser').urlencoded({ extended: true }));
var Post = require('./models/post');
//뷰를 렌더링 할때 사용할 기본 레이아웃
//기본적으로 익스프레스는 views 에서 뷰를 찾고, views/layouts에서 레이아웃을 찾는다.
var handlebars = require('express-handlebars').create({
    defaultLayout: 'main',
    helpers: {
        section: function (name, options) {
            if (!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        },
        // Function to do basic mathematical operation in handlebar
        math: function(lvalue, operator, rvalue) {
            lvalue = parseFloat(lvalue);
            rvalue = parseFloat(rvalue);
            return {
                "+": lvalue + rvalue,
                "-": lvalue - rvalue,
                "*": lvalue * rvalue,
                "/": lvalue / rvalue,
                "%": lvalue % rvalue
            }[operator];
        }
    }
});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

//쿼리스트링 감지하는 미들웨어는 이것을 사용할 라우터 보다 앞에 있어야함.
app.use(function (req, res, next) {
    res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
    next();
});
//파셜 쓰기.
//여러페이지에 나타나지만 모든 페이지에 나타나지 않는다면 이 방법 고려.
app.use(function (req, res, next) {
    if (!res.locals.partials) res.locals.partials = {};
    res.locals.partials.weatherContext = getWeather.getWeatherData();
    next();
});


app.get('/', function (req, res) {
    res.render('home');
});
app.get('/about', function (req, res) {
    //   var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render('about', {
        fortune: fortune.getFortune(),
        pageTestScript: '/qa/tests-about.js'
    });
});
app.get('/write-post', function (req, res) {
    res.render('write-post');
});
// GET ALL BOOKS
app.get('/show-post', function (req, res) {
    //데이터 조회 메소드
    //books 니까 복수겠네
//var testing = require('./models/book');
//tes
    Post.find({},function (err, posts) {
        if (err)
        {
             return res.status(500).send({ error: 'database failure' });
        }
        //res.send(books);
        //res.json(books);
        res.render('show-post',{
            datas:posts });
    });

   
});
app.get('/summernote-test',function(req,res){
    res.render('summernote-test');
});
app.post('/upload', function (req, res) {
    //        app.post('/handle-write-post', function(req,res){
    var post = new Post();
    post.title = req.body.post_title;
  //  post.content = htmlToText.fromString('<h1>Hello World</h1>');
  post.content = req.body.post_content;
  //  post.content = htmlToText.fromString(req.body.post_content);
    //db에 data 저장
    post.save(function (err) {
        if (err) {
            console.error(err);
            // res.json({result:0});
            return;
        }
        //res.json({result:1});
    });
    console.log('------------------------');
    console.log("Title : " + req.body.post_title);
    console.log("Content : " + post.content);
    res.redirect(303, '/show-post');
});


//404 Page
app.use(function (req, res, next) {
    res.status(404);
    res.render('404');
});
app.use(function (err, req, res, next) {
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
