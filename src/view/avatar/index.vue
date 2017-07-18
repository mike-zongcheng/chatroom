<template>
    <div class="avatarBox">
        <div class="imgBox">
            <img :src="avatarSrc"><span></span>
        </div>
        <label class="uploadBox">
            <!-- <span>头像：</span> -->
            <!-- <input type="file" name="avatar"> -->

            <vue-core-image-upload
              class="avatarSubmit"
              :crop="false"
              @imageuploaded="imageuploaded"
              :max-file-size="5242880"
              url="/api/avatarFile"
              inputOfFile = "avatar" 
              text="上传头像"
            >
            </vue-core-image-upload>

            <!-- <button type="button">上传头像</button> -->
        </label>
        <!-- <button class="avatarSubmit">提交</button> -->
    </div>
</template>

<script>
import {mapState} from 'vuex'
import axios from 'axios'
import VueCoreImageUpload from 'vue-core-image-upload'

export default {
  name: 'main',
  data () {
    return {
      phone:13575737563,
      price:100,
      src:'/api/avatarFile',
    }
  },
  components: {
    'vue-core-image-upload': VueCoreImageUpload,
  },
  computed:mapState({
    avatarSrc(state){
      return state.status.data.avatar;
    }
  }),
  methods:{
    imageuploaded(res){
      this.$store.commit("setAvatar", res.src)
      //this.avatarSrc = res.src;
      //console.log(this.avatarSrc,res.src)
      console.log(res)
    }
  }
}
</script>

<style>

</style>
