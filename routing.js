var server = require("./server.js")
	babel = require("babel-register");
/*	login = require("./reactModel/login.js"),//登录模块
	index = require("./reactModel/index.js"),//首页模块
	form = require("./reactModel/form.js"),//首页模块
	registered = require("./reactModel/registered.js"),//注册模块
	chatroom = require("./reactModel/chatroom.js"),//聊天室模块
	friend = require("./reactModel/friend.js"),//好友列表模块
	friendAdd = require("./reactModel/friendAdd.js"),//添加好友模块
	chat = require("./reactModel/chat.js"),//添加好友模块
	news = require("./reactModel/news.js");//消息中心模块*/

var mongdbUrl = server.mongodbUrl,
	MongoClient = server.mongodb,
	app = server.app
	io = server.io,
	hashName = server.hashName;

app.get("/",function(req,res){
	console.log(req.session.status)
	res.sendFile(__dirname+"/"+"index.html");
})//首页

/*

app.get("/chat",function(req,res){
	if(!req.session.status){
		res.redirect('./login');
		return;
	}
	if(req.query.id){
		res.render("chat",{component:chat(),name:req.session.status});
	}
})//私聊

*/

module.exports = app;