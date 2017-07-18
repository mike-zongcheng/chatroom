<template>
    <div class="lb_tc" v-show="show" ref="lb_tc">{{msg}}</div>
</template>

<script>
import {mapState} from 'vuex'
import axios from 'axios'

export default {
  props:{
    msg:{
        type:String
    },
    callback:{
        type:Function
    }
  },
  data(){
    return {
        show:false
    }
  },
  watch:{
    msg(){
        if(!this.msg){
            return;
        }
        this.show = true;
        setTimeout(()=>{
            this.show = false;
            this.$emit('update:msg', "")
            this.callback && this.callback();
        },1000);
    }
  }
}
</script>

<style>

</style>
