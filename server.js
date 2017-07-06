var express = require("express"),
	babel = require("babel-register"),
	MongoClient = require("mongodb").MongoClient,
	bodyParser = require('body-parser'),
	fs = require("fs"),
    cookieParser = require('cookie-parser'),
	ejs = require('ejs'),
    session = require('express-session'),
    multer  = require('multer');

var app = express(),hashName = new Array();

app.engine('.html',ejs.__express);// 使用ejs解析html模板

app.set('view engine', 'html');

app.use('/public',express.static(__dirname + '/public'));// 静态文件路径设置
app.use(bodyParser.json());

app.use(cookieParser());
app.use(session({
    secret: 'hubwiz app', // secret的值建议使用随机字符串
    cookie: {maxAge: 1000000*60}, // 过期时间（毫秒）
    resave:true,
    saveUninitialized: true
}));//session设置

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/upload/');
    },
    filename: function (req, file, cb) {
    	var suffixName = file.originalname.split(".")
        cb(null, "img" + Date.now() + "." + suffixName[suffixName.length-1]);  
    }
});// 上传图片

var upload = multer({storage:storage})// 图片保存
app.use(bodyParser.urlencoded({ extended: false }));

var server = app.listen("1996",function(){
   var host = server.address().address;
   var port = server.address().port;
})// 服务器创建
var io = require('socket.io').listen(server);//实时对话

module.exports = {
	app:app,
	server:server,
	mongodb:MongoClient,
	io:io,
	mongodbUrl:'mongodb://localhost:27017/runoob',
	hashName:hashName,
    upload:upload
}
