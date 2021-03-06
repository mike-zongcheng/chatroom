import Vue from 'vue'
import Vuex from 'vuex'
import router from './routing.js'
import '../public/static/css/style.css'
import axios from 'axios'
import VueSocketio from 'vue-socket.io'

Vue.use(Vuex)
Vue.use(VueSocketio, 'http://localhost:1996')

const store = new Vuex.Store({
	state:{
		count:3,
		status:''
	},
	mutations:{
		getStatus(state,payload){
			state.status = payload;
		},//修改登录状态
		setAvatar(state,payload){
			state.status.data.avatar = payload;
		}
	},
	actions:{
		getStatus(){
			return axios.get("/api/loginInquire",{});
		}
	}
})

router.beforeEach(function(to,form,next){
	if(to.name == "home"){
		store.dispatch('getStatus').then((req)=>{
			store.commit("getStatus",req.data)
		})
		next();
		return;
	}//首页查询
	if(!to.name){
		store.dispatch('getStatus').then((req)=>{
			store.commit("getStatus",req.data)
			if( !req.data.start ){
				next({ path: '/login' });
				return;
			}
			next();
		})
		return;
	}//验证是否登录，否则跳转登录页
	next();
})

new Vue({
  el: '#app',
  router,
  store
})
