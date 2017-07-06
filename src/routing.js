import Vue from 'vue'
import VueRouter from 'vue-router'
import {mapState} from 'vuex'
import Home from './view/home/Home.vue'
import Game from './view/game/index.vue'
import Recharge from './view/home/Recharge.vue'
import Withdraw from './view/home/withdraw.vue'
import Funds from './view/funds/index.vue'
import Head from './view/shared/head.vue'
import Login from './view/login/index.vue'
import Avatar from './view/avatar/index.vue'
import Registered from './view/registered/index.vue'

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
		{path:"/Game",components:{default:Game}},
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
			path:"/funds/:name",
			components:{default:Funds,head:Head}
		},
		{path:"*",component:{template:"<div>这个页面不存在：404</div>"}}
	]
})



export default router;
