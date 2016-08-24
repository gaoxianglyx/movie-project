var express = require('express');
var mongoose = require('mongoose');
var logger = require('morgan');
//var cookieSession = require('cookie-session');
var session = require('express-session');
// 静态资源请求路径
var path = require('path');
var bodyParser= require('body-parser');
var MongoStore = require('connect-mongo')(session);//将session存入mongodb
//var MongoStore = require('connect-mongo')(express);
var app = express();
var port = process.env.PORT || 3000;
app.locals.moment = require('moment');//记录上传的时间

// movie为mongodb的一个数据库
mongoose.connect('mongodb://localhost/movie')
app.use(session({
    secret: 'gaoxiangno123',//密码
    resave:false,//
    saveUninitialized:true,
    store: new MongoStore({
        url: 'mongodb://localhost/movie',
        collection: 'session'
    })
}))
app.set('views', './app/views/pages');
app.set('view engine', 'jade');
// 静态资源请求路径
app.use(express.static(path.join(__dirname, 'public/')));

// 表单数据格式化
app.use(bodyParser());
app.use(require('connect-multiparty')());
if('development' === app.get('env')){
    app.set('showStackError', true);//打印出错误
    app.use(logger(':method :url :status'));//请求的情况打印出来
    app.locals.pretty = true;//看网页源码的时候是有格式的
    mongoose.set('debug', true);//数据库打印出来
}

require('./config/routes')(app);//把路由都放到routes.js里面
// 监听端口
app.listen(port);
console.log('server started on port: ' + port+'mongod --dbpath  C:\Users\12510\Desktop\case\learn-node-master\movie-project\public\libs');  