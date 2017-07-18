<template>
    <div class="chatroomBox">
        <div id="status" class="chatroomTop">
            <ul>
                <li v-for="todo in massageList">
                    <div class="chatImgBox">
                        <img :src="todo.user.avatar" />
                    </div>
                    <div class="chatRightBox">
                        <div class="chatName">{{ todo.user.first_name }}</div>
                        <div class="chatText">{{ todo.massage }}</div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="chatroomBottom">
            <textarea class="textContent" v-model="text" ></textarea>
            <button type="button" @click="submit">提交</button>
        </div>
        <my-massage :msg.sync="msg" ></my-massage>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import axios from 'axios'
import io from 'vue-socket.io'
import massage from '../shared/massage.vue'

export default {
    name: 'main',
    data () {
        return {
            text:"",
            massageList:[],
            msg:''
        }
    },
    components:{
        'my-massage':massage
    },
    methods:{
        submit(){
            if(!this.text){
                this.msg = "发送内容不能为空";
                return;
            }
            this.$socket.emit("addNews",this.text);
            this.text = "";
        }
    },
    sockets:{
        news(msg){
            this.massageList.push(msg);
        },
    },
    created(){
        /*var _self = this;
        socket = io.connect("");
        socket.on("news",function(data){
            _self.state.child.push(data);
            _self.setState({child:_self.state.child})
        });*/

    }
}
</script>

<style>

</style>
