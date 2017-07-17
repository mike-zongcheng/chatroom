<template>
    <div id="content">
        <div data-reactroot="">
            <div class="newsBox">
                <dl class="news_list">
                    <dt class="news_title"><span>消息中心</span></dt>
                    <dd>
                        <div class="news_avatar">
                          <img src="public/static/images/portrait.jpg">
                      </div>
                      <div class="news_info">
                          <span class="news_name">1</span><span class="news_id">1</span>
                      </div>
                      <div class="news_verification">
                      </div>
                      <div class="news_buttons">
                          <button class="news_agree" data-id="1">同意</button><button class="news_refuse" data-id="1">拒绝</button>
                      </div>
                  </dd>
              </dl>
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
            callback:function(){}
        }
    },
    components:{
      'my-massage':massage
    },
    methods:{

    },
    created(){
        
    }
}
</script>

<style>

</style>
