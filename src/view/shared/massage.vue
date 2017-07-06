<template>
    <div class="lb_tc" v-show="show" ref="lb_tc">{{msg}}</div>
</template>

<script>
import {mapState} from 'vuex'
import axios from 'axios'

export default {
  props:{
    msg:'',
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
      this.show = true;
      setTimeout(()=>{
        this.show = false;
        this.callback && this.callback();
      },1500);
    }
  }
}
</script>

<style>

</style>
