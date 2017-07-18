<template>
    <div id="content">
        <div data-reactroot="">
            <div class="newsBox">
                <dl class="news_list">
                    <dt class="news_title"><span>消息中心</span></dt>
                    <dd v-for="(todo, index) in newsList">
                        <div class="news_avatar">
                          <img :src="todo.avatar">
                        </div>
                        <div class="news_info">
                            <span class="news_name">{{ todo.first_name }}</span>
                            <span class="news_id">{{ todo.id }}</span>
                        </div>
                        <div class="news_verification">
                            {{ todo.massage ? todo.massage : "该用户无验证消息" }}
                        </div>
                        <div class="news_buttons">
                          <button class="news_agree" @click="submit(todo.id, index)">同意</button>
                          <button class="news_refuse" @click="clone(todo.id, index)">拒绝</button>
                        </div>
                    </dd>
                </dl>
                <div class="friendListNull" v-if="newsNull">暂无消息</div>
            </div>
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
            newsList:[],
            name:'',
            password:'',
            msg:"",
            newsNull:false,
            callback:function(){}
        }
    },
    components:{
      'my-massage':massage
    },
    methods:{
        submit(ID, Index){
            var _self = this;
            axios.get("/api/news/agreeFriend",{
                params:{
                    id:ID
                }
            }).then((req)=>{
                 _self.newsList.splice(Index, 1)
                _self.msg = req.data.massage
            })
        },//同意请求
        clone(ID, Index){
            var _self = this;
            axios.get("/api/news/refuseFriend",{
                params:{
                    id:ID
                }
            }).then((req)=>{
                 _self.newsList.splice(Index, 1)
                 _self.msg = req.data.massage
            })
        }//拒绝请求
    },
    created(){
        var _self = this;
        axios.get("/api/friendNews",{}).then((req)=>{
            _self.newsList = req.data.data;
            if(req.data.data.length == 0){
                _self.newsNull = true;
            }
        })//查询好友请求
    }
}
</script>

<style>

</style>
