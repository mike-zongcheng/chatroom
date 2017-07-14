var server = require("./server.js"),
    _ = require('underscore'),
	fs = require("fs");

var mongdbUrl = server.mongodbUrl,
	MongoClient = server.mongodb,
	app = server.app,
	io = server.io,
	hashName = server.hashName
	upload = server.upload;

app.get("/loginInquire",function(req,res){
	if(req.session.status){
		res.json({"start":req.session.status,data:req.session.thisData});
	}else{
		res.end("未登录")
	}
})//是否登录查询

app.post("/process_login",function(req,res){
	console.log(req.body)
	MongoClient.connect(mongdbUrl, function(err, db) {
		var collection = db.collection('cool');
		collection.find({"first_name":req.body.name}).toArray(function(err,data){
			if(!data.length){
				db.close();
				res.json({massage:"该账户未注册",code:500})
			}else if(data[0].last_password != req.body.password){
				db.close();
				res.json({massage:'密码错误',code:500});
			}else{
				db.close();
				req.session.status = req.body.name;
				req.session.thisData = data[0];
				res.json({massage:'登录成功',code:200});
			}
		})
	})
})//登录

app.post("/process_registered",function(req,res){
	var response = {
       first_name:req.body.name,
       last_password:req.body.password,
       avatar:"public/static/images/portrait.jpg",
       news:[],
       friend:[]
    };
    MongoClient.connect(mongdbUrl, function(err, db) {
	    var collection = db.collection('cool');

	    collection.find({"first_name":req.body.name}).toArray(function(err,docs){
	    	if(docs.length){
	    		res.json({massage:"该账号已被注册",code:500});
	    		db.close();
	    	}else{
	    		collection.findAndModify({name:"uid"},[],{$inc:{id:1}},{new:true},function(err,result){
	    			response.id = result.value.id
	    			collection.insertMany([response], function(err, result) {
						res.json({massage:'注册成功，跳转登录',code:200});
						db.close();
				    });
	    		})
	    	}
	    })
	});
})//注册

app.get("/cancelLogin",function(req,res){
	req.session.status = false;
	res.json({massage:'退出成功',code:200});
})//退出登录


app.post("/avatarFile", upload.single('avatar'),function(req,res){
    MongoClient.connect(mongdbUrl,function(err,db){
    	var collection = db.collection("cool");
    	collection.find({"first_name":req.session.status}).toArray(function(err,data){
    		var history = data[0].avatar;
    		var imgPath = req.file.path.split("\\").join("/")
			collection.update({"first_name":data[0].first_name}, {$set:{"avatar":imgPath}}, function(err,result){
				if(err){
					console.log(err);
				}else{
					if(history){
						fs.unlink(history,function(err){
							if(err){console.log(err)}
						})
					}
					db.close();
					req.session.thisData.avatar = imgPath;
    				res.json({massage:"图片上传成功",code:200,src:imgPath})
				}
			})
    	})
    })
})//头像设置

app.get("/findFriend",function(req,res){
	MongoClient.connect(mongdbUrl,function(err,db){
		var collection = db.collection("cool");
		collection.find({"first_name":{$ne:null},$or:[{"first_name":req.query.val},{"id":req.query.val-0}]}).toArray(function(err,data){
			if(err){
				console.log(err)
			}else{
				db.close();
				for(var i in data){
					for(var k in data[i].friend){
						var thisData = {};
						thisData.first_name = data[i].first_name;
						thisData.id = data[i].id;
						if(thisData.avatar == "null" || thisData == null){
							thisData.avatar = "public/images/portrait.jpg";
						}else{
							thisData.avatar = data[i].avatar;
						}
						if(data[i].friend[k].first_name == req.session.thisData.first_name || data[i].friend[k].id == req.session.thisData.first_name){
							thisData.relation = "friend";
						}
						data[i] = thisData;
					}
				}
				data.code = 200;
				res.json(data);
			}
		});
	})
})//好友查询接口


app.get("/verification",function(req,res){
	if(req.query.id == req.session.thisData.id){
		res.json({code:500,massage:"无法给自己发送好友请求"});
		return;
	}
	MongoClient.connect(mongdbUrl,function(err,db){
		var collection = db.collection("cool");
		collection.find({"id":req.query.id-0,"first_name":req.query.aims}).toArray(function(err,data){
			if(data.length == 0){
				res.json({code:500,massage:"无数据"})
				return;
			}
			var newData = {};
			newData.first_name = req.session.status;
			newData.id = req.session.thisData.id;
			newData.avatar = req.session.thisData.avatar;
			newData.massage = req.query.massage;
			if(data[0].news){
				var newsData = data[0].news;
				newsData.push(newData)
			}else{
				var newsData = [];
				newsData.push(newData);
			}
			for(var i in data[0].news){
				console.log(data[0].news[i].id, req.session.thisData.id)
				if( data[0].news[i].id == req.session.thisData.id ){
					res.json({code:500,massage:"好友请求已存在"});
					db.close();
					return;
				}
			}//好友请求已存在
			collection.update({"id":req.query.id-0,"first_name":req.query.aims},{$set:{"news":newsData}},function(err,result){
				if(err){
					console.log(err)
				}else{
					res.json({code:200,massage:"消息已发送"})
				}
				db.close();
			})
		})
	})
})//发送好友请求
/*


app.get("/news/agreeFriend",function(req,res){
	MongoClient.connect(mongdbUrl,function(err,db){
		var collection = db.collection("cool");
		
		collection.find({"id":req.session.thisData.id,"first_name":{$ne:null}}).toArray(function(err,data){//查询自身数据
			var newData = data[0].news,newFriend = data[0].friend;
			
			collection.find({"id":req.query.id-0,"first_name":{$ne:null}}).toArray(function(err,data){//查询目标数据
				newFriend.push({"id":data[0].id,"first_name":data[0].first_name,"avatar":data[0].avatar})//将目标数据给自身
				var newFriendData = {"id":req.session.thisData.id,"first_name":req.session.thisData.first_name,"avatar":req.session.thisData.avatar}
				for(var i in newData){
					if(newData[i].id == req.query.id){
						newData.splice(i,1)
						collection.update({"id":req.session.thisData.id,"first_name":{$ne:null}},{$set:{"news":newData,"friend":newFriend}},function(err,data){//修改自身
							collection.findAndModify({"id":req.query.id-0,"first_name":{$ne:null}},[],{$push:{friend:newFriendData}},{new:true},function(err,result){//修改目标
				    			res.end("200")
				    			return;
				    		})//更改请求用户
						})
						break;
					}
				}
			})
		})
	})
})//同意好友请求

app.get("/returnname",function(req,res){
	if(!req.session.status){
		return;
	}
	res.end(req.session.status)
})//返回名称

app.get("/friend/delte",function(req,res){
	MongoClient.connect(mongdbUrl,function(err,db){
		var collection = db.collection("cool");
		collection.find({id:req.session.thisData.id,"first_name":{$ne:null}}).toArray(function(err,data){
			var newData = data[0].friend;
			for(var i in data[0].friend){
				if(data[0].friend[i].id == req.query.id){
					newData.splice(i,1);
					collection.update({id:req.session.thisData.id,"first_name":{$ne:null}},{$set:{"friend":newData}},function(err,data){
						collection.find({id:req.query.id-0,"first_name":{$ne:null}}).toArray(function(err,data){
							var newData = data[0].friend;
							for(var i in data[0].friend){
								if(data[0].friend[i].id == req.session.thisData.id){
									newData.splice(i,1);
									collection.update({id:req.query.id-0,"first_name":{$ne:null}},{$set:{"friend":newData}},function(){
										res.end("200");
									})
								}
							}
						})
					})
				}
			}
		})
	})
})//删除好友

app.get("/news/refuseFriend",function(req,res){
	MongoClient.connect(mongdbUrl,function(err,db){
		var collection = db.collection("cool");
		collection.find({"id":req.session.thisData.id,"first_name":{$ne:null}}).toArray(function(err,data){//查询自身数据
			for(var i in data[0].news){
				if(data[0].news[i].id == req.query.id){
					data[0].news.splice(i,1)
					collection.update({"id":req.session.thisData.id,"first_name":{$ne:null}},{$set:{"news":data[0].news}},function(){
						console.log("删除成功");
						res.end("200");
					})
				}
			}
		})
	})
})//拒绝好友请求



app.get("/chat",function(req,res){
	if(req.query.id){
		req.session.aimsId = id;
		res.end("200");
		//res.render("chat",{component:chat(),name:req.session.status});
	}
})//私聊接口

app.get("/friend/onlineName",function(req,res){
	var onlineList = [];
	res.end(JSON.stringify(hashName))
})//好友是否在线

io.on('connection', function (socket) {
	socket.on("collect",function(data){
		hashName[data.name] = socket.id;
		console.log(hashName)
	})//创建hashName获取当前在线用户
	socket.on("chat",function(data){
		var toSocket = _.findWhere(io.sockets.sockets,{id:hashName[data.name]});
		console.log(data.name)
		toSocket.emit("message",{value:"成功"})
	})//向指定用户发送消息
	socket.on('addNews', function (data) {
	    var newData = data;
	    MongoClient.connect("mongodb://localhost:27017/runoob",function(err,db){
			var collection = db.collection("cool");
		    collection.find({"first_name":data.name}).toArray(function(err,data){
				if(err){
					console.log(err)
				}else{
					db.close();
					newData.avatar = data[0].avatar && data[0].avatar != "null" ?data[0].avatar:"public/images/portrait.jpg";
					io.sockets.emit('news', newData);
				}
			})
	    })
	});//公共聊天
});//会话*/

