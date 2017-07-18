<template>
    <div data-reactroot="" class="friendBox">
        <div class="friendTop">
            <router-link to="/friend/news" class="friend_news">消息中心</router-link>
            <router-link to="/friend/add" class="friend_add">添加好友</router-link>
        </div>
        <div class="friendListBox">
            <div class="friendListNull" v-if="friendNull">暂无好友</div>
            <ul class="friendList">
                <li v-for="(todo, index) in friendList">
                    <div class="friend_avatarBox">
                        <img :src="todo.avatar" />
                    </div>
                    <div class="friend_infoBox">
                        <div class="friend_name">{{todo.first_name}}</div>
                        <span class="friend_id">{{todo.id}}</span>
                    </div>
                    <div class="fried_buttons">
                        <button type="button" class="friend_chat">私聊</button>
                        <button type="button" @click="deleteFriend(todo.id, index)" class="friend_delete">删除好友</button>
                    </div>
                </li>
            </ul>
        </div>
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
            name:'',
            friendNull:false,
            password:'',
            msg:"",
            friendList:[]
        }
    },
    components:{
        'my-massage':massage
    },
    methods:{
        deleteFriend(ID,Index){
            axios.get("/api/friend/delte",{
                params:{
                    id:ID,
                }
            }).then((req)=>{
                if(req.data.code == 200){
                    this.msg = req.data.massage;
                    this.friendList.splice(Index,1)
                }
            })
        }
    },
    computed:mapState({
        count:"count",
        status:"status"
    }),
    created(){
        var _self = this;
        axios.get("/api/friend",{}).then((req)=>{
            _self.friendList = req.data.data;
            if(req.data.data.length == 0){
                _self.friendNull = true;
            }
        })
    }
}
</script>

<style>

</style>
