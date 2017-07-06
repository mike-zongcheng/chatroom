<template>
  <div class="homeBox">
    <div id="status" class="home_status" @click="add">{{start}}</div>
    <router-link to="/Registered" class="home_registered" v-if="loginshow">注册</router-link>
    <router-link to="/login" class="home_login" v-if="loginshow">登录</router-link>
    <router-link to="/info" class="home_login">头像</router-link>
    <a href="chatroom" class="home_avatar">聊天室</a>
    <a href="friend" class="home_avatar">好友列表</a>
    <a href="javascript:;" @click="cancelLogin" v-if="!loginshow" class="outLogin">退出登录</a>
    <my-massage :msg="msg" :callback="callback" ></my-massage>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import axios from 'axios'
import massage from '../shared/massage.vue'

export default {
  name: 'main',
  data () {
    return {
      phone:13575737563,
      price:100,
      msg:"",
      loginshow:false,
      callback:function(){}
    }
  },
  components:{
    'my-massage':massage
  },
  computed:mapState({
    count:"count",
    status:"status",
    todoList(){
      return this.$store.getters.doneTodos
    },
    testCount(state){
      return state.count
    },
    start(state){
      var status = state.status.data ? state.status.data.first_name : state.status?state.status:'';
      status == "未登录"||status==""?(this.loginshow = true):(this.loginshow = false);
      return status;
    }
  }),
  methods:{
    cancelLogin(){
      var _self = this;
      if(this.status.data){
          axios.get("/api/cancelLogin",{}).then((req)=>{
            this.$store.commit("getStatus","未登录");
            _self.msg = req.data.massage; 
          })
      }
    },
    add(){
      this.$store.commit({
        type:"increment",
        num:2
      });

      function ajaxOne(){ 
        return axios.get("/api/loginInquire",{
          params:{name:"aaa"}
        })
      }

      function ajaxTwo(){
        return axios.get("/api/loginInquire",{})
      }//post请求主体无需放到params中

      axios.all([ajaxOne(),ajaxTwo()]).then((response)=>{
        console.log(response)
      })
    }
  }
}
</script>

<style>

</style>
