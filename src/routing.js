import Vue from 'vue'
import VueRouter from 'vue-router'
import {mapState} from 'vuex'
import Home from './view/home/Home.vue'
import Recharge from './view/home/Recharge.vue'
import Withdraw from './view/home/withdraw.vue'
import Head from './view/shared/head.vue'
import Login from './view/login/index.vue'
import Avatar from './view/avatar/index.vue'
import Registered from './view/registered/index.vue'

// 好友部分
import FriendList from './view/friend/list.vue'
import FriendAdd from './view/friend/add.vue'
import FriendNews from './view/friend/News.vue'

// 聊天室
import Chatroom from './view/chatroom/index.vue'

Vue.use(VueRouter);

const router = new VueRouter({//带有name的路由不会进行登录判断，name为Home的判断登录，但不跳转
	routes:[
		{
			path:"/",
			components:{default:Home,head:Head},
			name:"home"
		},
		{
			path:"/Login",
			components:{default:Login,head:Head},
			name:"true"
		},
		{
			path:"/Registered",
			components:{default:Registered,head:Head},
			name:"true"
		},
		{
			path:"/Recharge",
			components:{default:Recharge,head:Head}
		},
		{
			path:"/withdraw",
			components:{default:Withdraw,head:Head}
		},
		{
			path:"/info",
			components:{default:Avatar,head:Head}
		},
		{
			path:"/chat",
			components:{default:Chatroom,head:Head}
		},
		{
			path:"/friend/list",
			components:{default:FriendList,head:Head}
		},
		{
			path:"/friend/add",
			components:{default:FriendAdd,head:Head}
		},
		{
			path:"/friend/news",
			components:{default:FriendNews,head:Head}
		},
		{path:"*",component:{template:"<div>这个页面不存在：404</div>"}}
	]
})



export default router;
