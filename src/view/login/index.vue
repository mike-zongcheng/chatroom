<template>
    <div class="homeBox">
        <label class="login_name">
            <span>用户名：</span>
            <input type="text" v-model="name" name="name">
        </label>
        <label class="login_password">
            <span>密码：</span>
            <input type="password" v-model="password" name="password">
        </label>
        <button class="login_btn" @click="updata">登录</button>
        <my-massage :msg.sync="msg" :callback="callback" ></my-massage>
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
            callback:function(){}
        }
    },
    components:{
        'my-massage':massage
    },
    methods:{
        updata(){
            var _self = this;
            axios.post("/api/process_login",{
                name:_self.name,
                password:_self.password
            }).then((req)=>{
                this.$emit("test")
                this.msg = req.data.massage;
                if(req.data.code == 200){
                    this.callback = function(){
                        this.$router.replace({path:"/"})
                    }
                }else{
                    this.callback = function(){}
                }
            })
        }//登录提交
    }
}
</script>

<style>

</style>
