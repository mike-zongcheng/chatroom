<template>
    <div data-reactroot="" class="friendBox">
        <div class="friendTop">
            <router-link to="/friend/news" class="friend_news">消息中心</router-link>
            <router-link to="/friend/add" class="friend_add">添加好友</router-link>
        </div>
        <div class="friendListBox">
          <div class="friendListNull" v-if="friendNull">暂无好友</div>
          <ul class="friendList">{{todoList}}
              <li>
                <div class="friend_avatarBox">
                  <img src="" />
                </div>
                <div class="friend_infoBox">
                  <div class="friend_name">21312</div>
                  <span class="friend_id">12312</span>
                </div>
                <div class="fried_buttons">
                  <button type="button" class="friend_chat">私聊</button>
                  <button type="button" class="friend_delete">删除好友</button>
                </div>
              </li>
          </ul>
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
      friendNull:false,
      password:'',
      msg:"",
      callback:function(){}
    }
  },
  components:{
    'my-massage':massage
  },
  methods:{
    
  },
  computed:mapState({
    count:"count",
    status:"status",
    todoList(){
      console.log(this.status)
      return 1;
    }
  })
}
</script>

<style>

</style>
