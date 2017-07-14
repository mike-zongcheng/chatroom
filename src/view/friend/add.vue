<template>
    <div class="friendBox">
        <div class="friendTop">
            <input type="text" v-model="val" />
            <button type="button" @click="find" id="friend_find">查找好友</button>
        </div>
        <ul class="friendAddList">
            <li v-for="(todo,index) in friendList">
                <div class="friendAdd_avatarBox">
                    <img :src="todo.avatar">
                </div>
                <div class="friendAdd_info">
                    <div class="friendAdd_name">{{todo.first_name}}</div>
                </div>
                <button type="button" class="friendAdd_submit" @click="showPopup(index)">添加好友</button>
            </li>
        </ul>
        <div class="popUpBox" v-show="popUp">
            <div class="popUp_titleBox">
                <span class="popUp_title">验证消息</span><span class="clone" @click="hidePopup">x</span>
            </div>
            <div class="popUpBox_main">
                <input type="text" v-model="info" ><button type="button" @click="submit">提交</button>
            </div>
        </div>
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
      name:'',
      password:'',
      val:"",
      friendList:"",
      popUp:false,
      msg:"",
      info:"",
      listIndex:0,
      callback:function(){}
    }
  },
  components:{
    'my-massage':massage
  },
  methods:{
    find(){
      var _self = this;
      axios.get("/api/findFriend",{
        params:{val:_self.val}
      }).then((req)=>{
        console.log(req)
        if(req.status == 200){
          _self.friendList = req.data
        }
      })
    },//查找
    submit(){
      var data = this.friendList[this.listIndex],
          _self = this;
      axios.get("/api/verification",{
        params:{
          id:data.id,
          aims:data.first_name,
          massage:_self.info
        }
      }).then((req)=>{
        this.popUp = false;
        this.msg = req.data.massage;
        this.info = '';
      })
    },//添加好友
    showPopup(index){
      this.listIndex = index;
      this.popUp = true;
    },
    hidePopup(){
      this.popUp = false;
      this.info = '';
    }
  }
}
</script>

<style>

</style>
