<template>
    <div class="friendBox">
        <div class="friendTop">
            <input type="text" v-model="val" />
            <button type="button" @click="find" id="friend_find">查找好友</button>
        </div>
        <ul class="friendAddList">
            <li v-for="todo in friendList">
                <div class="friendAdd_avatarBox">
                    <img :src="todo.avatar">
                </div>
                <div class="friendAdd_info">
                    <div class="friendAdd_name">{{todo.first_name}}</div>
                </div>
                <button type="button" class="friendAdd_submit" data-index="0">添加好友</button>
            </li>
        </ul>
        <div class="popUpBox" v-show="popUp">
            <div class="popUp_titleBox">
                <span class="popUp_title">验证消息</span><span class="clone">x</span>
            </div>
            <div class="popUpBox_main">
                <input type="text"><button type="button">提交</button>
            </div>
        </div>
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
      msg:"",
      val:"",
      friendList:"",
      popUp:false,
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
    }
  }
}
</script>

<style>

</style>
