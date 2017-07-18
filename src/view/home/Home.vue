<template>
  <div class="homeBox">
    <div id="status" class="home_status">{{start}}</div>
    <router-link to="/Registered" class="home_registered" v-if="loginshow">注册</router-link>
    <router-link to="/login" class="home_login" v-if="loginshow">登录</router-link>
    <router-link to="/info" class="home_login">头像</router-link>
    <router-link to="/chat" class="home_avatar">聊天室</router-link>
    <router-link to="/friend/list" class="home_avatar">好友列表</router-link>
    <a href="javascript:;" @click="cancelLogin" v-if="!loginshow" class="outLogin">退出登录</a>
    <my-massage :msg.sync="msg" ></my-massage>
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
            msg:"",
            loginshow:false,
        }
    },
    components:{
        'my-massage':massage
    },
    computed:mapState({
        start(state){
            var status = state.status.data ? state.status.data.first_name : state.status?state.status:'';
            status == "未登录"||status==""?(this.loginshow = true):(this.loginshow = false);
            return status;
        }//账户信息
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
        },// 退出登录
    }
}
</script>

<style>

</style>
